import { z } from 'zod';

export const CoordinacionScheme = z.object({
    id: z.number().nonnegative().int(),
    id_curso: z.number().nonnegative().int(),
    id_coordinacion: z.number({ message: 'Selecciona una coordinacion' }).nonnegative().int(),
    ciudad: z.string().max(20),
    estado: z.string().max(20),
    coordinacion: z.string().max(40),
});
export type CoordinacionType = z.infer<typeof CoordinacionScheme>;

export const CoordinacionCursoScheme = CoordinacionScheme.pick({
    id: true,
    id_curso: true,
    id_coordinacion: true,
});
export type CoordinacionCursoType = z.infer<typeof CoordinacionCursoScheme>;

export const CoordinacionCursoDataScheme = CoordinacionScheme.pick({
    id_coordinacion: true,
});
export type CoordinacionCursoDataType = z.infer<typeof CoordinacionCursoDataScheme>;

export const CoordinacionCatalogoScheme = CoordinacionScheme.pick({
    id: true,
    ciudad: true,
    estado: true,
    coordinacion: true,
});
export type CoordinacionCatalogoType = z.infer<typeof CoordinacionCatalogoScheme>;
