import { ApiResponseScheme } from '@/models/apiResponse';
import { ComiteDirectivoScheme } from '@/models/comite_directivo';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetComiteDirecivoTesisResponse = ApiResponseScheme.extend({
    comite_directivo: z.array(ComiteDirectivoScheme),
});

export type GetComiteDirectivoTesisType = z.infer<typeof GetComiteDirecivoTesisResponse>;

export async function getComiteDirectivoTesis(id_tesis:number, token: string): Promise<GetComiteDirectivoTesisType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/tesis/get_comite.php?id=${id_tesis}`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatedResponse = GetComiteDirecivoTesisResponse.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetComiteDirectivoTesisType = {
            success: false,
            message: 'Error:'+error,
            comite_directivo: [],
        };
        return errorResponse;
    }
}
