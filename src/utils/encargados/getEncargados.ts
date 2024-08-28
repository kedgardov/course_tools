import { z } from 'zod';
import requestHandler from '@requestHandler';
import { EncargadoScheme } from '@models/encargado';
import { ApiResponseScheme } from '@models/apiResponse';

export const GetEncargadosScheme = ApiResponseScheme.extend({
    encargados: z.array(EncargadoScheme),
});

export type GetEncargadosType = z.infer<typeof GetEncargadosScheme>;

export async function getEncargados(id_curso: number, token: string): Promise<GetEncargadosType> {
   try {
       const response = await requestHandler.get(`encargados/get_encargados.php?id=${id_curso}`,{
           headers: {
               'Authorization': `Bearer ${token}`,
           },
       })
       const validatedResponse = GetEncargadosScheme.parse(response.data);
       return validatedResponse;
   } catch ( error ) {
       const errorResponse: GetEncargadosType = {
           success: false,
           message: 'Error:' + error,
           encargados: [],
       };
       return errorResponse;
   }
}
