import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { TemaScheme } from '@/models/tema';

export const GetTemasUnidadScheme = ApiResponseScheme.extend({
    temas: z.array(TemaScheme),
});
export type GetTemasUnidadType = z.infer<typeof GetTemasUnidadScheme>;

export async function getTemasUnidad( idUnidad: number, token: string): Promise<GetTemasUnidadType> {
    try {
        const response = await requestHandler.get(`temas/get_temas_unidad.php?id=${idUnidad}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetTemasUnidadScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetTemasUnidadType = {
            success: false,
            message: 'Error:'+ error,
            temas: []
        };
        return errorResponse;
    }
};
