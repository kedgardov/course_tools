'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { HabilidadCursoType } from '@/models/habilidad';
import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';


export async function updateHabilidadCurso( habilidadCurso:HabilidadCursoType, token:string ): Promise<ApiResponseType>{
    try {
        const response = await requestHandler.patch('habilidades/update_habilidad_curso.php',{
            habilidadCurso
        },{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${habilidadCurso.id_curso}/general`);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: `Error: ${error}`,
        };
        return errorResponse;
    }
};
