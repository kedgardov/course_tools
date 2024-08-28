import { z } from 'zod';

export const HabilidadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_tipo_habilidad: z.number().int().nonnegative(),
    habilidad: z.string().max(50),
});

export type HabilidadType = z.infer<typeof HabilidadScheme>;
