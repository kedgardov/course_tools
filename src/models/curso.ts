import { z } from 'zod';
import { OpcionTerminalCursoScheme } from './opcionTerminalCurso';


export const CursoScheme = z.object({
    id: z.number().int().nonnegative(),
    clave: z.string().max(15,{ message: 'Max 15' }),
    nombre: z.string().max(120, { message: 'Maximo 120 caracteres' }),
    nombre_ingles: z.string().min(1, { message: 'Ingrese el nombre del curso en ingles' }).max(120, { message: 'Maximo 120 caracteres' }).nullable(),
    id_tipo: z.number().int().nonnegative().nullable(),
    id_modalidad: z.number().int().nonnegative().nullable(),
    horas_teoricas_semana: z.number({message: 'Ingrese un valor'}).int({message:'Solo horas completas'}).nonnegative({message:'No numeros negativos'}).lt(100, { message:'Max 100 horas por semana' }).nullable(),
    horas_practicas_semana: z.number({message: 'Ingrese un valor'}).int().nonnegative({message:'No numeros negativos'}).lt(100, { message:'Max 100 horas por semana' }).nullable(),
    horas_semana: z.number({message: 'Ingrese un valor'}).int().nonnegative({message:'No numeros negativos'}).lt(100, { message:'Max 100 horas por semana' }).nullable(),
    horas_teoricas_semestre: z.number({message: 'Ingrese un valor'}).int({message:'Solo horas completas'}).nonnegative({message:'No numeros negativos'}).lt(100, { message:'Max 100 horas por semana' }).nullable(),
    horas_practicas_semestre: z.number({message: 'Ingrese un valor'}).int().nonnegative({message:'No numeros negativos'}).lt(100, { message:'Max 100 horas por semana' }).nullable(),
    horas_semestre: z.number({message: 'Ingrese un valor'}).int().nonnegative({message:'No numeros negativos'}).lt(300, { message:'Max 300 horas por semestre' }).nullable(),
    creditos: z.number({message:'Ingrese un valor'}).int({message:'Solo numeros enteros'}).nonnegative({message:'Solo numeros positivos'}).nullable(),
    vinculo_objetivos_posgrado: z.string().max(1200, {message: 'Maximo 1200 caracteres'}).nullable(),
    id_rol: z.number().int().nonnegative(),
});

export type CursoType = z.infer<typeof CursoScheme>;

export const CursoBasicDataScheme = CursoScheme.pick({
    nombre_ingles: true,
    id_tipo: true,
    id_modalidad: true,
});
export type CursoBasicDataType = z.infer<typeof CursoBasicDataScheme>;

export const CursoMiniScheme = CursoScheme.pick({
    id: true,
    clave: true,
    nombre: true,
    id_rol: true,
});
export type CursoMiniType = z.infer<typeof CursoMiniScheme>;

export const CursoNombreScheme = CursoScheme.pick({
    id: true,
    nombre: true,
});
export type CursoNombreType = z.infer<typeof CursoNombreScheme>;

export const CursoOpcionTerminalScheme = OpcionTerminalCursoScheme.merge(
    z.object({
        nombre: CursoScheme.shape.nombre,
    })
);
export type CursoOpcionTerminalType = z.infer<typeof CursoOpcionTerminalScheme>;
