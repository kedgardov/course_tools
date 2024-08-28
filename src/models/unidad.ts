import { z } from 'zod'


export const UnidadScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    numero: z.number().int().nonnegative(),
    titulo: z.string().min(1,{message:'Ingrese el Titulo de la Unidad'}).max(100,{ message: 'Maximo 100 caracteres' }),
    objetivo: z.string().max(1200).nullable(),
    id_tipo_habilidad: z.number().int().nonnegative().nullable(),
    id_habilidad: z.number().int().nonnegative().nullable(),
    id_categoria: z.number().int().nonnegative().nullable(),
    id_actividad_presencial: z.number().int().nonnegative().nullable(),
    id_actividad_independiente: z.number().int().nonnegative().nullable(),
    id_actividad_tarea: z.number().int().nonnegative().nullable(),
    descripcion_actividad_presencial: z.string().max(400).nullable(),
    descripcion_actividad_independiente: z.string().max(400).nullable(),
    descripcion_actividad_tarea: z.string().max(400).nullable(),
    evidencia_presencial: z.string().max(200).nullable(),
    evidencia_independiente: z.string().max(200).nullable(),
    evidencia_tarea: z.string().max(200).nullable(),
});
export type UnidadType = z.infer<typeof UnidadScheme>;

export const UnidadTituloScheme = UnidadScheme.pick({
    titulo: true,
});
export type UnidadTituloType = z.infer<typeof UnidadTituloScheme>;

export const UnidadDetallesScheme = UnidadScheme.pick({
    objetivo: true,
    id_tipo_habilidad: true,
    id_habilidad: true,
    id_categoria: true,
    id_actividad_presencial: true,
    id_actividad_independiente: true,
    id_actividad_tarea: true,
    descripcion_actividad_presencial: true,
    descripcion_actividad_independiente: true,
    descripcion_actividad_tarea: true,
    evidencia_presencial: true,
    evidencia_independiente: true,
    evidencia_tarea: true,
});
export type UnidadDetallesType = z.infer<typeof UnidadDetallesScheme>;


export const UnidadMiniScheme = UnidadScheme.pick({
    id: true,
    id_curso: true,
    numero: true,
    titulo:true,
});
export type UnidadMiniType = z.infer<typeof UnidadMiniScheme>;
