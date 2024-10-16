import { ApiResponseScheme } from '@/models/apiResponse';
import { Coordinacion2Scheme } from '@/models/coordinacion2';
import requestHandler from '@requestHandler';
import { z } from 'zod';

const GetCatalogoCoordinaciones2Scheme = ApiResponseScheme.extend({
    catalogo_coordinaciones_2: z.array(Coordinacion2Scheme),
});
export type GetCatalogoCoordinaciones2Type = z.infer<typeof GetCatalogoCoordinaciones2Scheme>;

export async function getCatalogoCoordinaciones2(token: string): Promise<GetCatalogoCoordinaciones2Type>{
    try {
        const response = await requestHandler.get(`repositorio_tesis/coordinaciones/select_catalogo_2.php`,{
           headers:{
               'Authorization': `Bearer ${token}`,
           }
        });
        const validatesResponse = GetCatalogoCoordinaciones2Scheme.parse(response.data);
        return validatesResponse;
    } catch ( error ) {
        const errorResponse: GetCatalogoCoordinaciones2Type = {
            success: false,
            message: 'Error:'+error,
            catalogo_coordinaciones_2: [],
        };
        return errorResponse;
    }
}
