'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';
import { UnidadType } from '@/models/unidad';

export async function updateUnidad( unidad:UnidadType, token:string ): Promise<ApiResponseType>{
    try {
        const response = await requestHandler.patch('unidades/update_unidad.php',{
            unidad
        },{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${unidad.id_curso}/unidades/${unidad.id}/detalles`);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: `Error: ${error}`,
        };
        return errorResponse;
    }
};
