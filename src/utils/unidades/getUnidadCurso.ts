import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { UnidadScheme } from '@/models/unidad';

export const GetUnidadCursoScheme = ApiResponseScheme.extend({
    unidad: z.nullable(UnidadScheme),
});
export type GetUnidadCursoType = z.infer<typeof GetUnidadCursoScheme>;

export async function getUnidadeCurso( idUnidad: number, token: string): Promise<GetUnidadCursoType> {
    try {
        const response = await requestHandler.get(`unidades/get_unidad_curso.php?id=${idUnidad}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetUnidadCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetUnidadCursoType = {
            success: false,
            message: 'Error:'+ error,
            unidad: null,
        };
        return errorResponse;
    }
};
