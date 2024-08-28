import { z } from 'zod';

export const TipoHabilidadScheme = z.object({
    id: z.number().int().nonnegative(),
    tipo: z.string().max(30),
});

export type TipoHabilidadType = z.infer<typeof TipoHabilidadScheme>;
