'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';
import { UnidadMiniType } from '@/models/unidad';

export async function updateUnidadMini( unidad:UnidadMiniType, token:string ): Promise<ApiResponseType>{
    try {
        const response = await requestHandler.patch('unidades/update_unidad_mini.php',{
            unidad
        },{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${unidad.id_curso}/unidades`);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: `Error: ${error}`,
        };
        return errorResponse;
    }
};
