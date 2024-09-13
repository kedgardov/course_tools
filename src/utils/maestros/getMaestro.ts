import requestHandler from '@requestHandler';
import { z } from 'zod';
import { MaestroDetallesScheme } from '@models/maestro';  // Ensure the correct import name is used
import { ApiResponseScheme } from '@models/apiResponse';

export const GetMaestroScheme = ApiResponseScheme.extend({
    maestro: z.nullable(MaestroDetallesScheme),
});

export type GetMaestroType = z.infer<typeof GetMaestroScheme>;

export async function getMaestro(id_maestro: number, token: string): Promise<GetMaestroType> {
    try {
        const response = await requestHandler.get(`maestros/get_maestro.php?id=${id_maestro}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Validate the response against the Zod schema
        const validatedResponse = GetMaestroScheme.parse(response.data);
        return validatedResponse;

    } catch (error) {
        // Capture the error message safely
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred';

        // Log the error for debugging
        console.error('Error fetching maestro:', errorMessage);

        // Return a standardized error response
        const errorResponse: GetMaestroType = {
            success: false,
            message: `Error: ${errorMessage}`,
            maestro: null,
        };
        return errorResponse;
    }
}
