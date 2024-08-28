import requestHandler from '@requestHandler';
import { z } from 'zod';
import { CoordinacionCatalogoScheme } from '@models/coordinacion';
import { ApiResponseScheme } from '@models/apiResponse';

export const GetCatalogoCoordinacionesScheme = ApiResponseScheme.extend({
    catalogo_coordinaciones: z.array(CoordinacionCatalogoScheme),
});

export type GetCatalogoCoordinacionesType = z.infer<typeof GetCatalogoCoordinacionesScheme>;

export async function getCatalogoCoordinaciones( token: string): Promise<GetCatalogoCoordinacionesType> {
    try {
        const response = await requestHandler.get('coordinaciones/get_catalogo.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoCoordinacionesScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoCoordinacionesType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_coordinaciones: []
        };
        return errorResponse;
    }
};
