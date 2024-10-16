'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';

export async function deleteCriterio(idCurso: number, idCriterio: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`criterios/delete_criterio.php?id=${idCriterio}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/evaluacion`);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
