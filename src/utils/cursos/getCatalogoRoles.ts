import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { RolScheme } from '@/models/rol';


export const GetCatalogoRolesScheme = ApiResponseScheme.extend({
    catalogo_roles: z.array(RolScheme),
});

export type GetCatalogoRolesType = z.infer<typeof GetCatalogoRolesScheme>;

export async function getCatalogoRoles(token: string): Promise<GetCatalogoRolesType> {
    try {
        const response = await requestHandler.get('cursos/get_catalogo_roles.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoRolesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_roles:[],
        };
    }
}
