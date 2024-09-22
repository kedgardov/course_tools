import requestHandler from '@requestHandler';
import { z } from 'zod';
import { ApiResponseScheme } from '@models/apiResponse';
import { ParticipacionCursoScheme } from '@/models/participacionCurso';


export const GetParticipacionesCursosScheme = ApiResponseScheme.extend({
    participaciones_cursos: z.array(ParticipacionCursoScheme),
});

export type GetParticipacionesCursosType = z.infer<typeof GetParticipacionesCursosScheme>;

export async function getParticipacionesCursos(token: string): Promise<GetParticipacionesCursosType> {
    try {
        const response = await requestHandler.get('facultades/get_participaciones_cursos.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const validatedResponse = GetParticipacionesCursosScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'+error,
            participaciones_cursos:[],
        };
    }
}
