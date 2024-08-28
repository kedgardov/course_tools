import { ApiResponseScheme } from '@/models/apiResponse';
import { TesisScheme } from '@/models/tesis';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetTesisResponseScheme = ApiResponseScheme.extend({
    tesis: z.nullable(TesisScheme),
});

export type GetTesisResponseType = z.infer<typeof GetTesisResponseScheme>;

export async function getTesis(id_tesis:number, token: string): Promise<GetTesisResponseType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/tesis/select_tesis.php?id=${id_tesis}`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatedResponse = GetTesisResponseScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetTesisResponseType = {
            success: false,
            message: 'Error:'+error,
            tesis: null,
        };
        return errorResponse;
    }
}
