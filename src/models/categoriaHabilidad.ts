import { z } from 'zod';

export const CategoriaHabilidadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_habilidad: z.number().int().nonnegative(),
    categoria: z.string().max(40),
});

export type CategoriaHabilidadType = z.infer<typeof CategoriaHabilidadScheme>;
