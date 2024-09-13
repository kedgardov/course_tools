import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { RolTesisScheme } from '@/models/rolTesis';

export const GetCatalogoRolesTesis = ApiResponseScheme.extend({
    catalogo_roles_tesis: z.array(RolTesisScheme),
});

export type GetCatalogoRolesTesisType = z.infer<typeof GetCatalogoRolesTesis>;

export async function getCatalogoRolesTesis( token: string): Promise<GetCatalogoRolesTesisType> {
    try {
        const response = await requestHandler.get('maestros/get_catalogo_roles_tesis.php', {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCatalogoRolesTesis.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoRolesTesisType = {
            success: false,
            message: 'Error:'+ error,
            catalogo_roles_tesis: []
        };
        return errorResponse;
    }
};
