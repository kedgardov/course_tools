import { ApiResponseScheme } from '@/models/apiResponse';
import { TesisMiniScheme } from '@/models/tesis';
import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetTesisMiniResponseScheme = ApiResponseScheme.extend({
    tesis_mini: z.array(TesisMiniScheme),
});
export type GetTesisMiniResponseType = z.infer<typeof GetTesisMiniResponseScheme>;

export async function getTesisMini(token: string): Promise<GetTesisMiniResponseType>{
    try {
        const response = await requestHandler.get('repositorio_tesis/tesis/get_all_mini.php',{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatedResponse = GetTesisMiniResponseScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetTesisMiniResponseType = {
            success: false,
            message: 'Error:'+error,
            tesis_mini: [],
        };
        return errorResponse;
    }
}
