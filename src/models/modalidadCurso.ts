import { z } from 'zod';

export const ModalidadCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    modalidad_curso: z.enum(['Presencial','Virtual','Hibrida']),
});
export type ModalidadCursoType = z.infer<typeof ModalidadCursoScheme>;
