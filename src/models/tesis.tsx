import { z } from 'zod';

export const TesisScheme = z.object({
    id: z.number().int().nonnegative(),
    id_autor: z.number().int().nonnegative(),
    id_coordinacion: z.number().int().nonnegative(),
    id_pronace: z.number().int().nonnegative(),
    id_grado: z.number().int().nonnegative(),
    id_file: z.number().int().nonnegative().nullable(),
    titulo: z.string().min(1).max(290),
    fecha: z.string().date().min(1).max(20),
    palabras_clave: z.string().min(1).max(390),
    resumen: z.string().min(1).max(3300),
    checked: z.boolean(),
});
export type TesisType = z.infer<typeof TesisScheme>;

export const TesisDataScheme = TesisScheme.pick({
    id_autor:true,
    id_coordinacion:true,
    id_pronace: true,
    id_grado: true,
    titulo: true,
    fecha: true,
    palabras_clave: true,
    resumen: true,
});
export type TesisDataType = z.infer<typeof TesisDataScheme>;

export const TesisMiniScheme = TesisScheme.pick({
    id: true,
    id_autor: true,
    id_coordinacion: true,
    id_pronace: true,
    id_grado: true,
    titulo: true,
    fecha: true,
    checked: true,
});
export type TesisMiniType = z.infer<typeof TesisMiniScheme>;