import requestHandler from '@requestHandler';
import { z } from 'zod';
import { MaestroPronacesScheme } from '@models/maestro';
import { ApiResponseScheme } from '@models/apiResponse';

// Schema for the API response extending with maestros_pronaces array
export const GetMaestrosPronacesScheme = ApiResponseScheme.extend({
  maestros_pronaces: z.array(MaestroPronacesScheme),
});

export type GetMaestrosPronacesType = z.infer<typeof GetMaestrosPronacesScheme>;

// Function to fetch maestros pronaces data
export async function getMaestrosPronaces(token: string): Promise<GetMaestrosPronacesType> {
  try {
    const response = await requestHandler.get('maestros/get_maestros_pronaces.php', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const validatedResponse = GetMaestrosPronacesScheme.parse(response.data);
    return validatedResponse;
  } catch (error) {
    // Handle error case, ensuring proper error message structure
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorResponse: GetMaestrosPronacesType = {
      success: false,
      message: `Error: ${errorMessage}`,
      maestros_pronaces: [],
    };
    return errorResponse;
  }
}
