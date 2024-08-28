import { z } from 'zod';


export const ObjetivoScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    numero: z.number().int().nonnegative(),
    tipo: z.enum(['especifico','general']),
    objetivo: z.string().min(1,{ message: 'Ingrese un objetivo' }).max(450, { message: 'Maximo 450 caracteres' }),
});
export type ObjetivoType = z.infer<typeof ObjetivoScheme>;

export const ObjetivoDataScheme = ObjetivoScheme.pick({
    objetivo: true,
});
export type ObjetivoDataType = z.infer<typeof ObjetivoDataScheme>;
