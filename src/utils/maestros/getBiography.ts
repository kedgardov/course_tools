import axios from 'axios';
import { parseStringPromise, processors } from 'xml2js';
import { z } from 'zod';

const { stripPrefix } = processors;

const BiographySchema = z.object({
  biography: z.object({
    visibility: z.string().optional(),
    path: z.string().optional(),
    'created-date': z.string().optional(),
    'last-modified-date': z.string().optional(),
    content: z.string().optional(),
  }),
});

export type Biography = z.infer<typeof BiographySchema>;

async function parseXml(xmlData: string): Promise<any> {
  return await parseStringPromise(xmlData, {
    explicitArray: false,
    ignoreAttrs: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix],
  });
}

export interface GetBiographyResponse {
  success: boolean;
  message: string;
  biography?: Biography;
}

export async function getBiography(orcidId: string): Promise<GetBiographyResponse> {
  try {
    const response = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/biography`, {
      headers: {
        Accept: 'application/xml',
      },
      timeout: 5000,
      family: 4,
    });
    const xmlData = response.data;
    const parsedData = await parseXml(xmlData);
    const biographyData = BiographySchema.parse(parsedData);

    return {
      success: true,
      message: 'Biography retrieved successfully',
      biography: biographyData,
    };
  } catch (error: any) {
    console.error('Error fetching biography:', error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}
