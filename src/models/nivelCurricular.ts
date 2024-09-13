import { z } from 'zod';

export const NivelCurricularScheme = z.object({
    id: z.number().int().nonnegative(),
    nivel_curricular: z.string().max(20),
});

export type NivelCurricularType = z.infer<typeof NivelCurricularScheme>;
