import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { NivelCurricularScheme } from '@/models/nivelCurricular';


export const GetCatalogoNivelesCurricularesScheme = ApiResponseScheme.extend({
    catalogo_niveles_curriculares: z.array(NivelCurricularScheme),
});

export type GetCatalogoNivelesCurricularesType = z.infer<typeof GetCatalogoNivelesCurricularesScheme>;

export async function getCatalogoNivelesCurriculares(token: string): Promise<GetCatalogoNivelesCurricularesType> {
    try {
        const response = await requestHandler.get('facultades/get_catalogo_niveles_curriculares.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoNivelesCurricularesScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_niveles_curriculares:[],
        };
    }
}
