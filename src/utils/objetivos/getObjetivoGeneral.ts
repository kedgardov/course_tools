import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import requestHandler from '@requestHandler';
import { ObjetivoScheme } from '@/models/objetivo';


export const GetObjetivoGeneralScheme = ApiResponseScheme.extend({
    objetivo_general: z.nullable(ObjetivoScheme),
});

export type GetObjetivoGeneralType = z.infer<typeof GetObjetivoGeneralScheme>;

export async function getObjetivoGeneral(id_curso: number, token: string): Promise<GetObjetivoGeneralType> {
    try {

        const response = await requestHandler.get(`objetivos/get_objetivo_general.php?id=${id_curso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });

        const validatedResponse = GetObjetivoGeneralScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetObjetivoGeneralType = {
            success: false,
            message: 'Error:' + error,
            objetivo_general: null,
        };
        return errorResponse;
    }
};
