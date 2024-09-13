import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { ProgramaScheme } from '@/models/programa';


export const GetCatalogoProgramasScheme = ApiResponseScheme.extend({
    catalogo_programas: z.array(ProgramaScheme),
});

export type GetCatalogoProgramasType = z.infer<typeof GetCatalogoProgramasScheme>;

export async function getCatalogoProgramas(token: string): Promise<GetCatalogoProgramasType> {
    try {
        const response = await requestHandler.get('facultades/get_catalogo_programas.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetCatalogoProgramasScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            catalogo_programas:[],
        };
    }
}
