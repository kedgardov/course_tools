import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { ActividadScheme } from '@/models/actividad';

export const GetCatalogoActividadesScheme = ApiResponseScheme.extend({
    catalogo_actividades: z.array(ActividadScheme),
});

export type GetCatalogoActividadesType = z.infer<typeof GetCatalogoActividadesScheme>;

export async function getCatalogoActividades( token: string): Promise<GetCatalogoActividadesType> {
    try {
        const response = await requestHandler.get('habilidades/get_catalogo_actividades.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoActividadesScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoActividadesType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_actividades: []
        };
        return errorResponse;
    }
};
