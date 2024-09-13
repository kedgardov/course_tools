import { z } from 'zod';
import { CursoMiniScheme } from '@models/curso';
import { ApiResponseScheme } from '@models/apiResponse';
import requestHandler from '@requestHandler';


export const GetCursoMiniScheme = ApiResponseScheme.extend({
    curso_mini: z.nullable(CursoMiniScheme),
});

export type GetCursoMiniType = z.infer<typeof GetCursoMiniScheme>;

export async function getCursoMini(id_curso: number, token: string): Promise<GetCursoMiniType> {
    try {
        const response = await requestHandler.get(`cursos/get_curso_mini.php?id=${id_curso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCursoMiniScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCursoMiniType = {
            success: false,
            message: 'Error:' + error,
            curso_mini: null,
        };
        return errorResponse;
    }
};
