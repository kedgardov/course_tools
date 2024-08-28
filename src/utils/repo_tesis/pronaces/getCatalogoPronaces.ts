import { ApiResponseScheme } from '@/models/apiResponse';
import { PronaceScheme } from '@/models/pronace';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetCatalogoPronacesScheme = ApiResponseScheme.extend({
    catalogo_pronaces: z.array(PronaceScheme),
});
export type GetCatalogoPronacesType = z.infer<typeof GetCatalogoPronacesScheme>;

export async function getCatalogoPronaces(token: string): Promise<GetCatalogoPronacesType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/pronaces/select_catalogo.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        console.log(response.data);
        const validatesResponse = GetCatalogoPronacesScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoPronacesType = {
            success: false,
            message: 'Error:'+error,
            catalogo_pronaces: [],
        };
        return errorResponse;
    }
}
