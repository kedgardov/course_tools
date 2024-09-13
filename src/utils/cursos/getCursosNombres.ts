import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { CursoNombreScheme } from '@models/curso';


export const GetCursosNombresScheme = ApiResponseScheme.extend({
    cursos_nombres: z.array(CursoNombreScheme),
});

export type GetCursosNombresType = z.infer<typeof GetCursosNombresScheme>;

export async function getCursosNombres(token: string): Promise<GetCursosNombresType> {
    try {
        const response = await requestHandler.get('cursos/get_cursos_nombres.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCursosNombresScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            cursos_nombres:[],
        };
    }
}
