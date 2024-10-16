'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';

export async function deleteTema(idCurso:number, idUnidad:number, idTema: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`temas/delete_tema.php?id=${idTema}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/unidades/${idUnidad}/temas`);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
