import { z } from 'zod';

export const VerboHabilidadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_habilidad: z.number().int().nonnegative(),
    verbo: z.string().min(1).max(50),
});
export type VerboHabilidadType = z.infer<typeof VerboHabilidadScheme>;
