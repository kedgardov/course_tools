import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { GrupoHabilidadScheme } from '@/models/grupoHabilidad';

export const GetCatalogoGruposHabilidadesScheme = ApiResponseScheme.extend({
    catalogo_grupos_habilidades: z.array(GrupoHabilidadScheme),
});

export type GetCatalogoGruposHabilidadesType = z.infer<typeof GetCatalogoGruposHabilidadesScheme>;

export async function getCatalogoGruposHabilidades( token: string): Promise<GetCatalogoGruposHabilidadesType> {
    try {
        const response = await requestHandler.get('habilidades/get_catalogo_grupos_habilidades.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoGruposHabilidadesScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoGruposHabilidadesType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_grupos_habilidades: []
        };
        return errorResponse;
    }
};
