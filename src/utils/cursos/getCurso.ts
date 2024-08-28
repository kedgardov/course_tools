import { z } from 'zod';
import { CursoScheme } from '@models/curso';
import { ApiResponseScheme } from '@models/apiResponse';
import requestHandler from '@requestHandler';


export const GetCursoScheme = ApiResponseScheme.extend({
    curso: z.nullable(CursoScheme),
});

export type GetCursoType = z.infer<typeof GetCursoScheme>;

export async function getCurso(id_curso: number, token: string): Promise<GetCursoType> {
    try {
        const response = await requestHandler.get(`cursos/get_curso.php?id=${id_curso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCursoType = {
            success: false,
            message: 'Error:' + error,
            curso: null,
        };
        return errorResponse;
    }
};
