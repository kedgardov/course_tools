import { ApiResponseScheme } from '@/models/apiResponse';
import { GradoScheme } from '@/models/grado';

import requestHandler from '@requestHandler';
import { z } from 'zod';


const GetCatalogoGradosScheme = ApiResponseScheme.extend({
    catalogo_grados: z.array(GradoScheme),
});
export type GetCatalogoGradosType = z.infer<typeof GetCatalogoGradosScheme>;

export async function getCatalogoGrados(token: string): Promise<GetCatalogoGradosType>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/grados/select_catalogo.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        console.log(response.data);
        const validatesResponse = GetCatalogoGradosScheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoGradosType = {
            success: false,
            message: 'Error:'+error,
            catalogo_grados: [],
        };
        return errorResponse;
    }
}
