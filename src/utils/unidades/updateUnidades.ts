'use server'
import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { UnidadMiniType } from '@/models/unidad';

export async function updateNumerosUnidades(idCurso: number, unidadesMini:UnidadMiniType[], token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.post('unidades/update_numeros.php',{
            unidadesMini,
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        revalidatePath(`/herramientas/cursos/${idCurso}/unidades`);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
