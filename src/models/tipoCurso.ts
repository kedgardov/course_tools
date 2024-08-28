import { z } from 'zod';

export const TipoCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    tipo_curso: z.enum(['Obligatorio','Optativo']),
});
export type TipoCursoType = z.infer<typeof TipoCursoScheme>;
