import { z } from 'zod';
import requestHandler from '@requestHandler';
import { EncargadoScheme } from '@models/encargado';
import { ApiResponseScheme } from '@models/apiResponse';

export const GetAllEncargadosScheme = ApiResponseScheme.extend({
    encargados: z.array(EncargadoScheme),
});

export type GetAllEncargadosType = z.infer<typeof GetAllEncargadosScheme>;

export async function getAllEncargados(token: string): Promise<GetAllEncargadosType> {
   try {
       const response = await requestHandler.get('encargados/get_all_encargados.php',{
           headers: {
               'Authorization': `Bearer ${token}`,
           },
       })
       const validatedResponse = GetAllEncargadosScheme.parse(response.data);
       return validatedResponse;
   } catch ( error ) {
       const errorResponse: GetAllEncargadosType = {
           success: false,
           message: 'Error:' + error,
           encargados: [],
       };
       return errorResponse;
   }
};
