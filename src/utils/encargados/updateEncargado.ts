'use server'
import requestHandler from '@requestHandler';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { EncargadoType } from '@/models/encargado';

export async function updateEncargadoCurso( encargadoCurso: EncargadoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('encargados/update_encargado.php',{
            encargadoCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${encargadoCurso.id_curso}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
