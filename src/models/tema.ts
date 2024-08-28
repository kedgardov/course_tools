import { z } from 'zod';

export const TemaScheme = z.object({
    id: z.number().int().nonnegative(),
    id_unidad: z.number().int().nonnegative(),
    numero: z.number().int().nonnegative(),
    titulo: z.string().min(1,{ message: 'Ingrese la descripcion de la unidad' }).max(100,{ message: 'Maximo 100 caracteres' }),
});
export type TemaType = z.infer<typeof TemaScheme>;

export const TemaDataScheme = TemaScheme.pick({
    titulo: true,
});
export type TemaDataType = z.infer<typeof TemaDataScheme>;
