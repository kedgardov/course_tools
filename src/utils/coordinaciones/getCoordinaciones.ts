import requestHandler from '@requestHandler';
import { z } from 'zod';
import { CoordinacionCursoScheme } from '@models/coordinacion';
import { ApiResponseScheme } from '@models/apiResponse';

export const GetCoordinacionesScheme = ApiResponseScheme.extend({
    coordinaciones: z.array(CoordinacionCursoScheme),
});

export type GetCoordinacionesType = z.infer<typeof GetCoordinacionesScheme>;

export async function getCoordinaciones(id_curso: number, token: string): Promise<GetCoordinacionesType> {
    try {
        const response = await requestHandler.get(`coordinaciones/get_coordinaciones.php?id=${id_curso}`, {
           headers: {
               'Authorization': `Bearer ${token}`,
           },
        });
        const validatedResponse = GetCoordinacionesScheme.parse(response.data);
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: GetCoordinacionesType = {
            success: false,
            message: 'Error:'+error,
            coordinaciones: []
        };
        return errorResponse;
    }
};
