import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { CursoOpcionTerminalScheme } from '@models/curso';


export const GetCursosOpcionesTerminalesScheme = ApiResponseScheme.extend({
    cursos_opciones_terminales: z.array(CursoOpcionTerminalScheme),
});

export type GetCursosOpcionesTerminalesType = z.infer<typeof GetCursosOpcionesTerminalesScheme>;

export async function getCursosOpcionesTerminales(token: string): Promise<GetCursosOpcionesTerminalesType> {
    try {
        const response = await requestHandler.get('cursos/get_cursos_opciones_terminales.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCursosOpcionesTerminalesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            cursos_opciones_terminales:[],
        };
    }
}
