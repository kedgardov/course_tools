'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';

export async function deleteUnidad(idCurso:number, idUnidad:number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`unidades/delete_unidad.php?id=${idUnidad}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/unidades/${idUnidad}`);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
