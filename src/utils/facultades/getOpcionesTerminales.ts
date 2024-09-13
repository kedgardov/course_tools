import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { OpcionTerminalCursoScheme } from '@/models/opcionTerminalCurso';


export const GetOpcionesTerminalesScheme = ApiResponseScheme.extend({
    opciones_terminales: z.array(OpcionTerminalCursoScheme),
});

export type GetOpcionesTerminalesType = z.infer<typeof GetOpcionesTerminalesScheme>;

export async function getOpcionesTerminales(id_curso:number, token: string): Promise<GetOpcionesTerminalesType> {
    try {
        const response = await requestHandler.get(`facultades/get_opciones_terminales.php?id=${id_curso}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetOpcionesTerminalesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            opciones_terminales:[],
        };
    }
}
