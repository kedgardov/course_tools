import { z } from 'zod';

export const AutorScheme = z.object({
    id: z.number().int().nonnegative(),
    autor: z.string().min(1).max(120),
    //grado: z.string().min(1).max(40),
    //nombre: z.string().min(1).max(40),
    //apellido: z.string().min(1).max(40),
});
export type AutorType = z.infer<typeof AutorScheme>;
