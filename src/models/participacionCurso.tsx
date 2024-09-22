import { z } from 'zod';

export const ParticipacionCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    id_maestro:  z.number().int().nonnegative(),
    id_curso:  z.number().int().nonnegative(),
    id_rol:  z.number().int().nonnegative(),
    id_opcion_terminal:  z.number().int().nonnegative(),
    id_programa:  z.number().int().nonnegative(),
    id_nivel_curricular:  z.number().int().nonnegative(),
});

export type  ParticipacionCursoType = z.infer<typeof ParticipacionCursoScheme>;

export const ParticipacionesDocenteScheme = z.object({
    id_maestro: z.number().int().nonnegative(),
    participaciones: z.number().int().nonnegative(),
});
export type ParticipacionesDocentesType = z.infer< typeof ParticipacionesDocenteScheme>;
