import { z } from 'zod';

export const MaestroScheme = z.object({
    id: z.number().nonnegative().int(),
    grado: z.preprocess(value => value ?? '', z.string().min(1, { message: 'Ingrese grado académico' }).max(50, { message: 'Máximo 50 caracteres' })).nullable(),
    nombre: z.string().min(1, { message: 'Ingrese nombre(s) del docente' }).max(100, { message: 'Máximo 100 caracteres' }).nullable(),
    apellido: z.string().min(1, { message: 'Ingrese apellido(s) del docente' }).max(100, { message: 'Máximo 100 caracteres' }).nullable(),
    label: z.string().max(250),
});
export type MaestroType = z.infer<typeof MaestroScheme>;

export const MaestroPronacesScheme = z.object({
    id: z.number().int().nonnegative(),
    count_total: z.number().int().nonnegative(),
    count_pronace_1: z.number().int().nonnegative(),
    count_pronace_2: z.number().int().nonnegative(),
    count_pronace_3: z.number().int().nonnegative(),
    count_pronace_4: z.number().int().nonnegative(),
    count_pronace_5: z.number().int().nonnegative(),
    count_pronace_6: z.number().int().nonnegative(),
    count_pronace_7: z.number().int().nonnegative(),
    count_pronace_8: z.number().int().nonnegative(),
    count_pronace_9: z.number().int().nonnegative(),
    count_pronace_10: z.number().int().nonnegative(),
    count_pronace_11: z.number().int().nonnegative(),
    count_pronace_12: z.number().int().nonnegative(),
    count_pronace_13: z.number().int().nonnegative(),
});
export type MaestroPronacesType = z.infer<typeof MaestroPronacesScheme>;

export const MaestroDetallesScheme = MaestroScheme.extend({
    email: z.string().email({ message: 'Correo electrónico no válido' }).min(1, { message: 'Ingrese correo electrónico' }).max(50, { message: 'Máximo 100 caracteres' }).nullable(),
    institucion_trabajo: z.string().min(1, { message: 'Ingrese el nombre de la institución donde labora' }).max(200, { message: 'Máximo 200 caracteres' }).nullable(),
});
export type MaestroDetallesType = z.infer<typeof MaestroDetallesScheme>;

export const MaestroDetallesDataScheme = MaestroDetallesScheme.pick({
  grado: true,
  nombre: true,
  apellido: true,
  email: true,
  institucion_trabajo: true,
});
export type MaestroDetallesDataType = z.infer<typeof MaestroDetallesDataScheme>;
