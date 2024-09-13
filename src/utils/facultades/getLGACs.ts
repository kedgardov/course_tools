import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { LGACCursoScheme } from '@/models/lgacCurso';


export const GetLGACsScheme = ApiResponseScheme.extend({
    lgacs: z.array(LGACCursoScheme),
});

export type GetLGACsType = z.infer<typeof GetLGACsScheme>;

export async function getLGACs(id_curso:number, token: string): Promise<GetLGACsType> {
    try {
        const response = await requestHandler.get(`facultades/get_lgacs.php?id=${id_curso}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetLGACsScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            lgacs:[],
        };
    }
}
