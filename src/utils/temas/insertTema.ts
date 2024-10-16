'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';
import { TemaType } from '@/models/tema';

export async function insertTema( idCurso: number, tema: TemaType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('temas/insert_tema.php',{
            tema,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/unidades/${tema.id_unidad}/temas`, 'page');
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
