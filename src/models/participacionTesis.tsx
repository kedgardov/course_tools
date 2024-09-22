import { z } from 'zod';

export const ParticipacionTesisScheme = z.object({
    id: z.number().int().nonnegative(),
    id_maestro: z.number().int().nonnegative(),
    id_tesis: z.number().int().nonnegative(),
    id_rol_tesis:z.number().int().nonnegative(),
    id_coordinacion: z.number().int().nonnegative(),
    id_pronace: z.number().int().nonnegative(),
    id_opcion_terminal: z.number().int().nonnegative(),
    id_grado: z.number().int().nonnegative(),
    id_autor: z.number().int().nonnegative(),
    fecha: z.string().date(),
});

export type ParticipacionTesisType = z.infer<typeof ParticipacionTesisScheme>;

export const ParticipacionesDocenteScheme = z.object({
    id_maestro: z.number().int().nonnegative(),
    participaciones: z.number().int().nonnegative(),
});
export type ParticipacionesDocentesType = z.infer< typeof ParticipacionesDocenteScheme>;
