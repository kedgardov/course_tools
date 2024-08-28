import { z } from 'zod';

export const MaestroScheme = z.object({
    id: z.number().nonnegative().int(),
    grado: z.preprocess(value => value ?? '', z.string().max(50)),
    nombre: z.string().max(100),
    apellido: z.string().max(100),
    label: z.string().max(250),
});
export type MaestroType = z.infer<typeof MaestroScheme>;
