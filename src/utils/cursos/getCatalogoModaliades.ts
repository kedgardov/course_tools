import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { ModalidadCursoScheme } from '@/models/modalidadCurso';


export const GetCatalogoModalidadesScheme = ApiResponseScheme.extend({
    catalogo_modalidades: z.array(ModalidadCursoScheme),
});

export type GetCatalogoModalidadesType = z.infer<typeof GetCatalogoModalidadesScheme>;

export async function getCatalogoModalidades(token: string): Promise<GetCatalogoModalidadesType> {
    try {
        const response = await requestHandler.get('cursos/get_catalogo_modalidades.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoModalidadesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_modalidades:[],
        };
    }
}
