import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';


export async function deleteEncargado(idEncargado: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`encargados/delete_encargado_curso.php?id=${idEncargado}`, {
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
