'use server'
import requestHandler from '@requestHandler';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';

export async function updateOpcionTerminalCurso( opcionTerminalCurso: OpcionTerminalCursoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('cursos/update_opcion_terminal_curso.php',{
            opcionTerminalCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${opcionTerminalCurso.id_curso}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
