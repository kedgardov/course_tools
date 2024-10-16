import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { VerboHabilidadScheme } from '@/models/verboHabilidad';

export const GetCatalogoVerbosScheme = ApiResponseScheme.extend({
    catalogo_verbos: z.array(VerboHabilidadScheme),
});

export type GetCatalogoVerbosType = z.infer<typeof GetCatalogoVerbosScheme>;

export async function getCatalogoVerbos( token: string): Promise<GetCatalogoVerbosType> {
    try {
        const response = await requestHandler.get('habilidades/get_catalogo_verbos.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoVerbosScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoVerbosType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_verbos: []
        };
        return errorResponse;
    }
};
