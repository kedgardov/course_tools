'use server'
import requestHandler from '@requestHandler';
import { revalidatePath } from 'next/cache';
import { TemaType } from '@/models/tema';
import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';

export async function updateTema( idCurso: number, tema: TemaType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('temas/update_tema.php',{
            tema,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/unidades/${tema.id_unidad}/temas`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
