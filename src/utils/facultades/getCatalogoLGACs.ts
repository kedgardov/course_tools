import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { LGACScheme } from '@/models/lgac';


export const GetCatalogoLGACsScheme = ApiResponseScheme.extend({
    catalogo_lgacs: z.array(LGACScheme),
});

export type GetCatalogoLGACsType = z.infer<typeof GetCatalogoLGACsScheme>;

export async function getCatalogoLGACs(token: string): Promise<GetCatalogoLGACsType> {
    try {
        const response = await requestHandler.get('facultades/get_catalogo_lgacs.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoLGACsScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_lgacs:[],
        };
    }
}
