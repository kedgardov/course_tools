import { ApiResponseScheme } from '@/models/apiResponse';
import { TesisFinderScheme } from '@/models/tesis';
import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetCatalogoTesisScheme= ApiResponseScheme.extend({
    catalogo_tesis: z.array(TesisFinderScheme),
});
export type GetCatalogoTesisType= z.infer<typeof GetCatalogoTesisScheme>;

export async function getCatalogoTesis(token: string): Promise<GetCatalogoTesisType>{
    try {
        const response = await requestHandler.get('repositorio_tesis/tesis/get_catalogo_tesis.php',{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatedResponse = GetCatalogoTesisScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoTesisType = {
            success: false,
            message: 'Error:'+error,
            catalogo_tesis: [],
        };
        return errorResponse;
    }
}
