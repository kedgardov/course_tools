import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { CursoMiniScheme } from '@models/curso';


export const GetCatalogoCursosMiniScheme = ApiResponseScheme.extend({
    catalogo_cursos_mini: z.array(CursoMiniScheme),
});

export type GetCatalogoCursosMiniType = z.infer<typeof GetCatalogoCursosMiniScheme>;

export async function getCatalogoCursosMini(token: string): Promise<GetCatalogoCursosMiniType> {
    try {
        const response = await requestHandler.get('cursos/get_catalogo_mini.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoCursosMiniScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_cursos_mini:[],
        };
    }
}
