'use server'
import requestHandler from '@requestHandler';
import { InsertApiResponseScheme, InsertApiResponseType } from '@models/InsertApiResponse';
import { revalidatePath } from 'next/cache';
import { ObjetivoType } from '@/models/objetivo';


export async function addObjetivo( objetivo: ObjetivoType, token:string ): Promise<InsertApiResponseType>{
    try {
        const response = await requestHandler.post('objetivos/insert_objetivo.php',{
            objetivo
        },{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${objetivo.id_curso}/objetivos`);
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
