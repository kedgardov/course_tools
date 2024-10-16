import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import requestHandler from '@requestHandler';
import { ObjetivoScheme } from '@/models/objetivo';


export const GetObjetivosEspecificosScheme = ApiResponseScheme.extend({
    objetivos_especificos: z.array(ObjetivoScheme),
});

export type GetObjetivosEspecificosType = z.infer<typeof GetObjetivosEspecificosScheme>;

export async function getObjetivosEspecificos(id_curso: number, token: string): Promise<GetObjetivosEspecificosType> {
    try {

        const response = await requestHandler.get(`objetivos/get_objetivos_especificos.php?id=${id_curso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });

        const validatedResponse = GetObjetivosEspecificosScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetObjetivosEspecificosType = {
            success: false,
            message: 'Error:' + error,
            objetivos_especificos: [],
        };
        return errorResponse;
    }
};
