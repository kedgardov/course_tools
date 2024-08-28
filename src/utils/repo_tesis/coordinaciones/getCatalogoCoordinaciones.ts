import { ApiResponseScheme } from '@/models/apiResponse';

import requestHandler from '@requestHandler';
import { z } from 'zod';


export const CoordinacionScheme = z.object({
    id: z.number().int().nonnegative(),
    coordinacion: z.string().min(1).max(50),
});
export type CoordinacionType = z.infer<typeof CoordinacionScheme>;

const GetCatalogoCoordinacionesScheme = ApiResponseScheme.extend({
    catalogo_coordinaciones: z.array(CoordinacionScheme),
});
export type GetCatalogoCoordinacionesType = z.infer<typeof GetCatalogoCoordinacionesScheme>;

export async function getCatalogoCoordinaciones(token: string): Promise<GetCatalogoCoordinacionesType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/coordinaciones/select_catalogo.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        console.log(response.data);
        const validatesResponse = GetCatalogoCoordinacionesScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoCoordinacionesType = {
            success: false,
            message: 'Error:'+error,
            catalogo_coordinaciones: [],
        };
        return errorResponse;
    }
}
