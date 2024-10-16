'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { CriterioType } from '@/models/criterio';
import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';

export async function updateCriterio( criterio: CriterioType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('criterios/update_criterio.php',{
            criterio,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${criterio.id_curso}/evaluacion`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
