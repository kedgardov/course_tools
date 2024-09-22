import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { ParticipacionTesisScheme } from '@/models/participacionTesis';



// Define the schema for the GetTesisMaestro API response
export const GetParticipacionesTesisScheme = ApiResponseScheme.extend({
    participaciones_tesis: z.array(ParticipacionTesisScheme),
});

// Define the TypeScript type inferred from the schema
export type GetParticipacionesTesisType = z.infer<typeof GetParticipacionesTesisScheme>;

// Function to fetch the tesis data for a specific maestro
export async function getParticipacionesTesis(token: string): Promise<GetParticipacionesTesisType> {
    try {
        const response = await requestHandler.get('repositorio_tesis/tesis/get_participaciones_tesis.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Validate the response against the Zod schema
        const validatedResponse = GetParticipacionesTesisScheme.parse(response.data);
        return validatedResponse;

    } catch (error) {
        // Capture the error message safely
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred';

        // Return a standardized error response
        const errorResponse: GetParticipacionesTesisType = {
            success: false,
            message: `Error: ${errorMessage}`,
            participaciones_tesis: [],
        };
        return errorResponse;
    }
}
