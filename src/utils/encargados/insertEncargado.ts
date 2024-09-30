'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';
import { EncargadoType } from '@/models/encargado';

export async function insertEncargadoCurso( encargadoCurso: EncargadoType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('encargados/insert_encargado_curso.php',{
            encargadoCurso,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${encargadoCurso.id_curso}/general`, 'page');
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
