'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { InsertApiResponseScheme, InsertApiResponseType } from '@/models/InsertApiResponse';
import { CriterioType } from '@/models/criterio';

export async function insertCriterio( criterio: CriterioType, token: string ): Promise<InsertApiResponseType> {
    try {
        const response = await requestHandler.post('criterios/insert_criterio.php',{
            criterio,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${criterio.id_curso}/evaluacion`, 'page');
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
