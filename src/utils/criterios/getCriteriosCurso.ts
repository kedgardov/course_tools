import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { CriterioScheme } from '@models/criterio';

export const GetCriteriosCursoScheme = ApiResponseScheme.extend({
    criterios: z.array(CriterioScheme),
});
export type GetCriteriosCursoType = z.infer<typeof GetCriteriosCursoScheme>;

export async function getCriteriosCurso( idCurso: number, token: string): Promise<GetCriteriosCursoType> {
    try {
        const response = await requestHandler.get(`criterios/get_criterios_curso.php?id=${idCurso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCriteriosCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCriteriosCursoType = {
            success: false,
            message: 'Error:'+ error,
            criterios: []
        };
        return errorResponse;
    }
};
