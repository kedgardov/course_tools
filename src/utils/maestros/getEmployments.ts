import axios from 'axios';
import { parseStringPromise, processors } from 'xml2js';
import { z } from 'zod';

const { stripPrefix } = processors;

const DateSchema = z.object({
  year: z.string().optional(),
  month: z.string().optional(),
  day: z.string().optional(),
});

const OrganizationSchema = z.object({
  name: z.string().optional(),
  address: z.object({
    city: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  'disambiguated-organization': z.object({
    'disambiguated-organization-identifier': z.string().optional(),
    'disambiguation-source': z.string().optional(),
  }).optional(),
});

const EmploymentSummarySchema = z.object({
  'put-code': z.string().optional(),
  'display-index': z.string().optional(),
  path: z.string().optional(),
  visibility: z.string().optional(),
  'created-date': z.string().optional(),
  'last-modified-date': z.string().optional(),
  'department-name': z.string().optional(),
  'role-title': z.string().optional(),
  'start-date': DateSchema.optional(),
  'end-date': DateSchema.optional(),
  organization: OrganizationSchema.optional(),
  url: z.string().optional(),
});

const AffiliationGroupSchema = z.object({
  'last-modified-date': z.string().optional(),
  'external-ids': z.any().optional(),
  'employment-summary': z.union([
    EmploymentSummarySchema,
    z.array(EmploymentSummarySchema),
  ]).optional(),
});

const EmploymentsSchema = z.object({
  employments: z.object({
    path: z.string().optional(),
    'last-modified-date': z.string().optional(),
    'affiliation-group': z.union([
      AffiliationGroupSchema,
      z.array(AffiliationGroupSchema),
    ]).optional(),
  }),
});

export type Employments = z.infer<typeof EmploymentsSchema>;

async function parseXml(xmlData: string): Promise<any> {
  return await parseStringPromise(xmlData, {
    explicitArray: false,
    ignoreAttrs: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix],
  });
}

export interface GetEmploymentsResponse {
  success: boolean;
  message: string;
  employments?: Employments;
}

export async function getEmployments(orcidId: string): Promise<GetEmploymentsResponse> {
  try {
    const response = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/employments`, {
      headers: {
        Accept: 'application/xml',
      },
      timeout: 5000,
      family: 4,
    });
    const xmlData = response.data;
    const parsedData = await parseXml(xmlData);
    const employmentsData = EmploymentsSchema.parse(parsedData);

    return {
      success: true,
      message: 'Employments retrieved successfully',
      employments: employmentsData,
    };
  } catch (error: any) {
    console.error('Error fetching employments:', error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}
