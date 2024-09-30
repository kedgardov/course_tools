'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { CoordinacionCursoType } from '@/models/coordinacion';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';

export async function insertCoordinacionCurso( coordinacionCurso: CoordinacionCursoType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('cursos/insert_coordinacion_curso.php',{
            coordinacionCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${coordinacionCurso.id_curso}/general`, 'page');
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
