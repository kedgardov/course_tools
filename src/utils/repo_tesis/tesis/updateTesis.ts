import { ApiResponseScheme, ApiResponseType } from '@/models/apiResponse';
import { TesisDataType } from '@/models/tesis';
import requestHandler from '@requestHandler';


export async function updateTesis(id_tesis: number, tesis:TesisDataType, token: string): Promise<ApiResponseType>{
    try {
        const response = await requestHandler.patch('repositorio_tesis/tesis/update_tesis.php',{
            id_tesis,
            tesis,
        },{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatedResponse = ApiResponseScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:'+error,
        };
        return errorResponse;
    }
}