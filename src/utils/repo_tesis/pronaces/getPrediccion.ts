import { ApiResponseScheme } from '@/models/apiResponse';
import { PronaceScheme } from '@/models/pronace';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetPrediccionPronaceScheme = ApiResponseScheme.extend({
    prediccion: PronaceScheme.nullable(),
});
export type GetPrediccionPronaceType = z.infer<typeof GetPrediccionPronaceScheme>;

export async function getPrediccion(id_tesis:number, token: string): Promise<GetPrediccionPronaceType>{
    try {
        console.log('getting predicion');
        const response = await requestHandler.get(`repositorio_tesis/pronaces/select_prediccion.php?id=${id_tesis}`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        console.log('prediction',response.data);
        const validatesResponse = GetPrediccionPronaceScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetPrediccionPronaceType = {
            success: false,
            message: 'Error:'+error,
            prediccion: null,
        };
        return errorResponse;
    }
}
