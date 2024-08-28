import { z } from 'zod';

export const ActividadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_habilidad: z.number().int().nonnegative(),
    actividad: z.string().max(60),
    descripcion: z.string().max(350),
});

export type ActividadType = z.infer<typeof ActividadScheme>;
