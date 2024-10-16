import { z } from 'zod';

export const ActividadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_habilidad: z.number().int().nonnegative(),
    actividad: z.string().max(100),
    descripcion: z.string().max(500),
});

export type ActividadType = z.infer<typeof ActividadScheme>;
