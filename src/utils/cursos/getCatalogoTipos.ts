import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { TipoCursoScheme } from '@/models/tipoCurso';


export const GetCatalogoTiposScheme = ApiResponseScheme.extend({
    catalogo_tipos: z.array(TipoCursoScheme),
});

export type GetCatalogoTiposType = z.infer<typeof GetCatalogoTiposScheme>;

export async function getCatalogoTipos(token: string): Promise<GetCatalogoTiposType> {
    try {
        const response = await requestHandler.get('cursos/get_catalogo_tipos.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoTiposScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_tipos:[],
        };
    }
}
