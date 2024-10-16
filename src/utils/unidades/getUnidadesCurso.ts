import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { UnidadMiniScheme } from '@/models/unidad';

export const GetUnidadesCursoScheme = ApiResponseScheme.extend({
    unidades: z.array(UnidadMiniScheme),
});
export type GetUnidadesCursoType = z.infer<typeof GetUnidadesCursoScheme>;

export async function getUnidadesCurso( idCurso: number, token: string): Promise<GetUnidadesCursoType> {
    try {
        const response = await requestHandler.get(`unidades/get_unidades_curso.php?id=${idCurso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetUnidadesCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetUnidadesCursoType = {
            success: false,
            message: 'Error:'+ error,
            unidades: []
        };
        return errorResponse;
    }
};
