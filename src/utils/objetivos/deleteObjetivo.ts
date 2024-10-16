'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';


export async function deleteObjetivo(idObjetivo: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`objetivos/delete_objetivo.php?id=${idObjetivo}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
