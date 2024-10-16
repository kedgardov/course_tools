import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';


export async function deleteHabilidadCurso(idHabilidadCurso: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`habilidades/delete_habilidad_curso.php?id=${idHabilidadCurso}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
        };
    }
}
