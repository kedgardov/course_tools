'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';

export async function insertOpcionTerminalCurso( opcionTerminalCurso: OpcionTerminalCursoType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('cursos/insert_opcion_terminal_curso.php',{
            opcionTerminalCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${opcionTerminalCurso.id_curso}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: InsertApiResponseType = {
            success: false,
            message: 'Error:' + error,
            id: 0,
        };
        return errorResponse;
    }
};
