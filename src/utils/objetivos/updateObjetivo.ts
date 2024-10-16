'use server'
import requestHandler from '@requestHandler';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { ObjetivoType } from '@/models/objetivo';

export async function updateObjetivo( objetivo: ObjetivoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('objetivos/update_objetivo.php',{
            objetivo,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${objetivo.id_curso}/objetivos`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
