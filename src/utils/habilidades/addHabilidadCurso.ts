'use server'
import requestHandler from '@requestHandler';
import { InsertApiResponseScheme, InsertApiResponseType } from '@models/InsertApiResponse';
import { revalidatePath } from 'next/cache';
import { HabilidadCursoType } from '@/models/habilidad';


export async function addHabilidadCurso( habilidadCurso:HabilidadCursoType, token:string ): Promise<InsertApiResponseType>{
    try {
        const response = await requestHandler.post('habilidades/insert_habilidad_curso.php',{
            habilidadCurso
        },{
            headers: {
                'Authorization': `Bearer ${token},`
            },
        });
        const validatedResponse: InsertApiResponseType = InsertApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${habilidadCurso.id_curso}/general`);
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
