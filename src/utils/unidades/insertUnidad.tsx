'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';
import { UnidadMiniType } from '@/models/unidad';

export async function insertUnidad( unidad: UnidadMiniType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('unidades/insert_unidad.php',{
            unidad,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${unidad.id_curso}/unidades`, 'page');
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
