import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { CursoMiniScheme } from '@models/curso';


export const GetCursosMiniScheme = ApiResponseScheme.extend({
    cursos_mini: z.array(CursoMiniScheme),
});

export type GetCursosMiniType = z.infer<typeof GetCursosMiniScheme>;

export async function getCursosMini(token: string): Promise<GetCursosMiniType> {
    try {
        const response = await requestHandler.get('cursos/get_cursos_mini.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCursosMiniScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            cursos_mini:[],
        };
    }
}
