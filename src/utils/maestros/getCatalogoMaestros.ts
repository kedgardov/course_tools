import requestHandler from '@requestHandler';
import { z } from 'zod';
import { MaestroScheme } from '@models/maestro';
import { ApiResponseScheme } from '@models/apiResponse';

export const GetCatalogoMaestrosScheme = ApiResponseScheme.extend({
    catalogo_maestros: z.array(MaestroScheme),
});

export type GetCatalogoMaestrosType = z.infer<typeof GetCatalogoMaestrosScheme>;

export async function getCatalogoMaestros( token: string): Promise<GetCatalogoMaestrosType> {
    try {
        const response = await requestHandler.get('maestros/get_catalogo.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoMaestrosScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoMaestrosType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_maestros: []
        };
        return errorResponse;
    }
};
