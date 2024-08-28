'use server'
import requestHandler from '@requestHandler';
import { CursoType } from '@models/curso';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';

export async function updateCurso( curso: CursoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('cursos/update_curso.php',{
            curso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/cursos/${curso.id}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
