'use server'
import requestHandler from '@requestHandler';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { CoordinacionCursoType } from '@/models/coordinacion';

export async function updateCoordinacionCurso( coordinacionCurso: CoordinacionCursoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('cursos/update_coordinacion_curso.php',{
            coordinacionCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${coordinacionCurso.id_curso}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
