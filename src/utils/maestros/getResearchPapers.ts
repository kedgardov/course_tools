import axios from 'axios';
import { z } from 'zod';

// Define the Contributor schema
const ContributorSchema = z.object({
  orcid: z.string().optional(),
  name: z.string(),
});

type Contributor = z.infer<typeof ContributorSchema>;

// Update the Paper schema to include contributors, publicationDate, year, type, and citation
const PaperSchema = z.object({
  title: z.string(),
  doi: z.string().optional(),
  contributors: z.array(ContributorSchema).default([]),
  publicationDate: z.string().optional(),
  year: z.number().optional(),
  citation: z.string().optional(),
  type: z.string().optional(),
});

export type Paper = z.infer<typeof PaperSchema>;

// Existing schemas
const ExternalIdSchema = z.object({
  'external-id-type': z.string(),
  'external-id-value': z.string(),
});

const WorkSummarySchema = z.object({
  'put-code': z.number(),
  'title': z.object({
    'title': z.object({
      'value': z.string(),
    }),
  }),
  'external-ids': z.object({
    'external-id': z.union([
      z.array(ExternalIdSchema),
      ExternalIdSchema,
    ]).optional(),
  }).optional(),
});

const GroupSchema = z.object({
  'work-summary': z.array(WorkSummarySchema),
});

const ORCIDWorksResponseSchema = z.object({
  'group': z.array(GroupSchema),
});

export interface GetPapersResponse {
  success: boolean;
  message: string;
  papers: Paper[];
}

export async function getPapersFromOrcid(orcidId: string): Promise<GetPapersResponse> {
  try {
    console.log('Enviando request a endpoint');
    // Fetch the works from the ORCID API
    const response = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Respuesta Obtenida');
    // Validate and parse the response data
    const parsedData = ORCIDWorksResponseSchema.parse(response.data);
    console.log('Respuesta parseada');

    const papers: Paper[] = [];

    console.log('Looking for paper details' );
    // Iterate over the groups and work summaries
    for (const group of parsedData.group) {
      for (const workSummary of group['work-summary']) {
        const title = workSummary.title.title.value;
        const putCode = workSummary['put-code'];

        // Fetch detailed work information using the put-code
        const workDetailResponse = await axios.get(
          `https://pub.orcid.org/v3.0/${orcidId}/work/${putCode}`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        const workDetail = workDetailResponse.data;

        // Extract the DOI
        let doi: string | undefined = undefined;

        const externalIds = workDetail['external-ids']?.['external-id'];

        if (externalIds) {
          if (Array.isArray(externalIds)) {
            for (const externalId of externalIds) {
              if (externalId['external-id-type']?.toLowerCase() === 'doi') {
                doi = externalId['external-id-value'];
                break; // Use the first DOI found
              }
            }
          } else {
            const externalId = externalIds;
            if (externalId['external-id-type']?.toLowerCase() === 'doi') {
              doi = externalId['external-id-value'];
            }
          }
        }

        // Extract contributors
        let contributors: Contributor[] = [];

        if (workDetail.contributors && workDetail.contributors.contributor) {
          const contributorDataArray = workDetail.contributors.contributor;
          const contributorsArray = Array.isArray(contributorDataArray)
            ? contributorDataArray
            : [contributorDataArray]; // Ensure it's an array

          for (const contributor of contributorsArray) {
            const name = contributor['credit-name']?.value || 'N/A';
            const orcidRaw = contributor['contributor-orcid']?.uri;
            const orcid = orcidRaw ?? undefined; // Convert null to undefined

            const contributorData = ContributorSchema.parse({
              name,
              orcid,
            });

            contributors.push(contributorData);
          }
        }

        // Extract the publication date and year
        let publicationDate: string | undefined = undefined;
        let year: number | undefined = undefined;

        const pubDate = workDetail['publication-date'];

        if (pubDate && pubDate.year && pubDate.year.value) {
          const yearValue = pubDate.year.value;
          year = parseInt(yearValue, 10); // Convert year string to number
          const month = pubDate.month?.value;
          const day = pubDate.day?.value;

          if (month && day) {
            publicationDate = `${yearValue}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          } else if (month) {
            publicationDate = `${yearValue}-${month.padStart(2, '0')}`;
          } else {
            publicationDate = yearValue;
          }
        }

        // Extract the type of publication
        const type = workDetail['type'] || undefined;

        // Extract the citation
        let citation: string | undefined = undefined;

        if (workDetail['citation'] && workDetail['citation']['citation-value']) {
          citation = workDetail['citation']['citation-value'];
        }

        // Create a paper object and validate it
        const paper = PaperSchema.parse({
          title,
          doi,
          contributors,
          publicationDate,
          year,
          type,
          citation,
        });

        papers.push(paper);
      }
    }

    return {
      success: true,
      message: 'Papers retrieved successfully',
      papers,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      papers: [],
    };
  }
}
