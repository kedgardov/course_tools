import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { AutorFuenteScheme, FuenteScheme } from '@/models/fuente';

export const GetFuenteAndAutoresScheme = ApiResponseScheme.extend({
    fuente: FuenteScheme.nullable(),
    autores: z.array(AutorFuenteScheme),
});

export type GetFuenteAndAutoresType = z.infer<typeof GetFuenteAndAutoresScheme>;

export async function getFuenteAndAutores(idFuente: number, token: string): Promise<GetFuenteAndAutoresType> {
    try {
        const response = await requestHandler.get(`fuentes/get_fuente_and_autores.php?id=${idFuente}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        console.log('from api',response);
        const validatedResponse = GetFuenteAndAutoresScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetFuenteAndAutoresType = {
            success: false,
            message: 'Error:'+ error,
            fuente: null,
            autores: [],
        };
        return errorResponse;
    }
};
