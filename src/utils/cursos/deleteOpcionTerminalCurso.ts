import requestHandler from '@requestHandler';
import { ApiResponseScheme, ApiResponseType } from '@models/apiResponse';


export async function deleteOpcionTerminalCurso(idOpcionTerminal: number, token: string): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get(`cursos/delete_opcion_terminal_curso.php?id=${idOpcionTerminal}`, {
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
