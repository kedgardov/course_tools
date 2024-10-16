import { ApiResponseScheme } from "@/models/apiResponse";
import { RolScheme, RolType } from "@/models/rol";
import requestHandler from "@/requestHandler";
import { z } from 'zod';

export const GetPermisosInCursoScheme = ApiResponseScheme.extend({
    roles_curso: z.array(RolScheme),
});
export type GetPermisosInCursoType = z.infer<typeof GetPermisosInCursoScheme>;

export const canEditCurso = (roles: RolType[]) => {
    for (const rol of roles) {
        if (rol.rol === 'god' || rol.rol === 'Responsable') {
            return true;
        }
    }
    return false;
};

export const getPermisosInCurso = async (idCurso: number, token: string ): Promise<GetPermisosInCursoType> => {
    try {
        const response = await requestHandler.get(`session/get_permisos_curso.php?id=${idCurso}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetPermisosInCursoScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetPermisosInCursoType = {
            success: false,
            message: 'Error: '+error,
            roles_curso: [],
        };
        return errorResponse;
    }
};
