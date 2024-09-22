import { ApiResponseScheme } from '@/models/apiResponse';
import { OpcionTerminalScheme } from '@/models/opcionTerminal';

import requestHandler from '@requestHandler';
import { z } from 'zod';

const GetCatalogoOpcionesTerminalesScheme = ApiResponseScheme.extend({
    catalogo_opciones_terminales: z.array(OpcionTerminalScheme),
});
export type GetCatalogoOpcionesTerminalesType = z.infer<typeof GetCatalogoOpcionesTerminalesScheme>;

export async function getCatalogoOpcionesTerminales(token: string): Promise<GetCatalogoOpcionesTerminalesType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/opciones_terminales/select_catalogo.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatesResponse = GetCatalogoOpcionesTerminalesScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoOpcionesTerminalesType = {
            success: false,
            message: 'Error:'+error,
            catalogo_opciones_terminales: [],
        };
        return errorResponse;
    }
}
