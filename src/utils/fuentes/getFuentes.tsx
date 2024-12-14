import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { AutorFuenteScheme, FuenteScheme } from '@/models/fuente';

export const GetFuentesAndAutoresScheme = ApiResponseScheme.extend({
    fuentes: z.array(FuenteScheme),
    autores: z.array(AutorFuenteScheme),
});

export type GetFuentesAndAutoresType = z.infer<typeof GetFuentesAndAutoresScheme>;

export async function getFuentesAndAutores(idCurso: number, token: string): Promise<GetFuentesAndAutoresType> {
    try {
        const response = await requestHandler.get(`fuentes/get_fuentes_and_autores.php?id=${idCurso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetFuentesAndAutoresScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetFuentesAndAutoresType = {
            success: false,
            message: 'Error:'+ error,
            fuentes: [],
            autores: [],
        };
        return errorResponse;
    }
};
