import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export interface Contributor {
  orcid?: string;
  name: string;
}

export interface Paper {
  title: string;
  doi?: string;
  contributors: Contributor[];
  publicationDate?: string;
  type?: string;
  journalTitle?: string;
}

export interface GetPapersResponse {
  success: boolean;
  message: string;
  papers: Paper[];
}

export async function getWorks(orcidId: string): Promise<GetPapersResponse> {
  try {
    // Fetch the works from the ORCID API
    const response = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
      headers: {
        'Accept': 'application/xml',
      },
      timeout: 5000,
      family: 4,
    });

    const xmlData = response.data;
    const parsedData = await parseStringPromise(xmlData, { explicitArray: false });

    // Extract works from parsedData
    const papers = extractPapers(parsedData);

    return {
      success: true,
      message: 'Papers retrieved successfully',
      papers,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
      papers: [],
    };
  }
}

function extractPapers(parsedData: any): Paper[] {
  const worksGroup = parsedData['activities:works']?.['activities:group'];

  if (!worksGroup) {
    return [];
  }

  const groups = Array.isArray(worksGroup) ? worksGroup : [worksGroup];
  const papers: Paper[] = [];

  for (const group of groups) {
    const workSummaries = group['work:work-summary'];
    if (!workSummaries) continue;

    const summaries = Array.isArray(workSummaries) ? workSummaries : [workSummaries];

    for (const workSummary of summaries) {
      // Extract paper data
      const paper = extractPaperData(workSummary);
      papers.push(paper);
    }
  }

  return papers;
}

function extractPaperData(workSummary: any): Paper {
  // Extract title
  const titleObj = workSummary['work:title'];
  const title = titleObj?.['common:title']?._ || titleObj?.['common:title'] || 'No Title';

  // Extract journal title
  const journalTitleObj = workSummary['work:journal-title'];
  const journalTitle = journalTitleObj?._ || journalTitleObj || undefined;

  // Extract DOI
  const doi = extractDOI(workSummary);

  // Extract publication date
  const publicationDate = extractPublicationDate(workSummary);

  // Extract type
  const type = workSummary['work:type']?._ || workSummary['work:type'] || undefined;

  // Contributors are not available in the summary; they require an authenticated request
  const contributors: Contributor[] = [];

  return {
    title,
    doi,
    contributors,
    publicationDate,
    type,
    journalTitle,
  };
}

function extractDOI(workSummary: any): string | undefined {
  const externalIds = workSummary['common:external-ids']?.['common:external-id'];
  if (!externalIds) return undefined;

  const externalIdsArray = Array.isArray(externalIds) ? externalIds : [externalIds];
  const doiEntry = externalIdsArray.find(
    (id: any) => id['common:external-id-type']?.toLowerCase() === 'doi'
  );
  return doiEntry ? doiEntry['common:external-id-value']?._ || doiEntry['common:external-id-value'] : undefined;
}

function extractPublicationDate(workSummary: any): string | undefined {
  const pubDate = workSummary['common:publication-date'];
  if (!pubDate) return undefined;

  const year = pubDate['common:year']?._ || pubDate['common:year'];
  const month = pubDate['common:month']?._ || pubDate['common:month'];
  const day = pubDate['common:day']?._ || pubDate['common:day'];

  return [year, month?.padStart(2, '0'), day?.padStart(2, '0')].filter(Boolean).join('-');
}
