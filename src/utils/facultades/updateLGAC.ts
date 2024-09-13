'use server'
import requestHandler from '@requestHandler';
import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';
import { revalidatePath } from 'next/cache';
import { LGACCursoType } from '@/models/lgacCurso';

export async function updateLGAC( lgac: LGACCursoType, token: string ): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.patch('facultades/update_lgac.php',{
            lgac,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        revalidatePath(`/cursos/${lgac.id_curso}/general`, 'page');
        return validatedResponse;
    } catch ( error ) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};
