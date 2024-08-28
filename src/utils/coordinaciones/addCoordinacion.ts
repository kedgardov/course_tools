'use server'
import requestHandler from '@requestHandler';
import { InsertApiResponseScheme, InsertApiResponseType } from '@models/InsertApiResponse';
import { revalidatePath } from 'next/cache';

interface coordinacionData {
    id_curso: number;
    id_coordinacion: number;
};


export async function addCoordinacion( coordinacionData: coordinacionData, token:string ): Promise<InsertApiResponseType>{
    try {
        const response = await requestHandler.post('coordinaciones/insert_coordinacion.php',coordinacionData,{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/cursos/${coordinacionData.id_curso}/general`);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: InsertApiResponseType = {
            success: false,
            message: `Error: ${error}`,
            id: 0,
        };
        return errorResponse;
    }
};
