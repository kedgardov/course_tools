import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { HabilidadCursoScheme } from '@/models/habilidad';

export const GetHabilidadesCursoScheme = ApiResponseScheme.extend({
    habilidades_curso: z.array(HabilidadCursoScheme),
});
export type GetHabilidadesCursoType = z.infer<typeof GetHabilidadesCursoScheme>;

export async function getHabilidadesCurso( idCurso: number, token: string): Promise<GetHabilidadesCursoType> {
    try {
        const response = await requestHandler.get(`habilidades/get_habilidades_curso.php?id=${idCurso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetHabilidadesCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetHabilidadesCursoType = {
            success: false,
            message: 'Error:'+ error,
            habilidades_curso: []
        };
        return errorResponse;
    }
};
