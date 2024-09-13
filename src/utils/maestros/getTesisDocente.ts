import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { TesisMiniMaestroScheme } from '@/models/tesis';



// Define the schema for the GetTesisMaestro API response
export const GetTesisMaestroScheme = ApiResponseScheme.extend({
    tesis_maestro: z.array(TesisMiniMaestroScheme),
});

// Define the TypeScript type inferred from the schema
export type GetTesisMaestroType = z.infer<typeof GetTesisMaestroScheme>;

// Function to fetch the tesis data for a specific maestro
export async function getTesisMaestro(id_maestro: number, token: string): Promise<GetTesisMaestroType> {
    try {
        const response = await requestHandler.get(`maestros/get_tesis_maestro.php?id=${id_maestro}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Validate the response against the Zod schema
        const validatedResponse = GetTesisMaestroScheme.parse(response.data);
        return validatedResponse;

    } catch (error) {
        // Capture the error message safely
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred';

        // Return a standardized error response
        const errorResponse: GetTesisMaestroType = {
            success: false,
            message: `Error: ${errorMessage}`,
            tesis_maestro: [],
        };
        return errorResponse;
    }
}
