import { z } from 'zod';

export const GrupoHabilidadScheme = z.object({
    id: z.number().int().nonnegative(),
    grupo_habilidad: z.string().min(1).max(50),
});

export type GrupoHabilidadType = z.infer<typeof GrupoHabilidadScheme>;
