import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { OpcionTerminalScheme } from '@/models/opcionTerminal';


export const GetCatalogoOpcionesTerminalesScheme = ApiResponseScheme.extend({
    catalogo_opciones_terminales: z.array(OpcionTerminalScheme),
});

export type GetCatalogoOpcionesTerminalesType = z.infer<typeof GetCatalogoOpcionesTerminalesScheme>;

export async function getCatalogoOpcionesTerminales(token: string): Promise<GetCatalogoOpcionesTerminalesType> {
    try {
        const response = await requestHandler.get('facultades/get_catalogo_opciones_terminales.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoOpcionesTerminalesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_opciones_terminales:[],
        };
    }
}
