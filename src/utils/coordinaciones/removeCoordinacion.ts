'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';



export async function removeCoordinacion( id:number, id_curso:number, token:string ): Promise<ApiResponseType>{
    try {
        const response = await requestHandler.delete('coordinaciones/delete_coordinacion.php',{
            headers: {
                'Authorization': `Bearer ${token},`
            },
            data: {id},
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/cursos/${id_curso}/general`);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: `Error: ${error}`,
        };
        return errorResponse;
    }
};
