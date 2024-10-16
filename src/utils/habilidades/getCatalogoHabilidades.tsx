import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { HabilidadScheme } from '@/models/habilidad';

export const GetCatalogoHabilidadesScheme = ApiResponseScheme.extend({
    catalogo_habilidades: z.array(HabilidadScheme),
});

export type GetCatalogoHabilidadesType = z.infer<typeof GetCatalogoHabilidadesScheme>;

export async function getCatalogoHabilidades( token: string): Promise<GetCatalogoHabilidadesType> {
    try {
        const response = await requestHandler.get('habilidades/get_catalogo_habilidades.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoHabilidadesScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoHabilidadesType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_habilidades: []
        };
        return errorResponse;
    }
};
