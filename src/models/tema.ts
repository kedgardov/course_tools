import { z } from 'zod';

export const TemaScheme = z.object({
    id: z.number().int().nonnegative(),
    id_unidad: z.number().int().nonnegative(),
    numero: z.number().int().nonnegative(),
    tema: z.string().min(1,{ message: 'Ingrese la descripcion de la unidad' }).max(255,{ message: 'Maximo 255 caracteres' }),
});
export type TemaType = z.infer<typeof TemaScheme>;

export const TemaDataScheme = TemaScheme.pick({
    tema: true,
});
export type TemaDataType = z.infer<typeof TemaDataScheme>;
