import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';


export async function deleteCoordinacionCurso(idCoordinacion: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`cursos/delete_coordinacion_curso.php?id=${idCoordinacion}`, {
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
