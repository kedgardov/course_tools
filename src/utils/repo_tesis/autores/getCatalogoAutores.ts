import { ApiResponseScheme } from '@/models/apiResponse';
import { AutorScheme } from '@/models/autor';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetAutoresResponseScheme = ApiResponseScheme.extend({
    autores: z.array(AutorScheme),
});
export type GetAutoresResponseType = z.infer<typeof GetAutoresResponseScheme>;

export async function getAutores(token: string): Promise<GetAutoresResponseType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/autores/select_catalogo.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        console.log(response.data);
        const validatesResponse = GetAutoresResponseScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetAutoresResponseType = {
            success: false,
            message: 'Error:'+error,
            autores: [],
        };
        return errorResponse;
    }
}
