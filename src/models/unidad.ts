import { z } from 'zod'


export const UnidadScheme = z.object({
    id: z.number({ message: 'Campo obligatorio' }).int().nonnegative(),
    id_curso: z.number({ message: 'Campo obligatorio' }).int().nonnegative(),
    numero: z.number({ message: 'Campo obligatorio' }).int().nonnegative(),

    unidad: z.string()
        .min(1, { message: 'Ingrese el Titulo de la Unidad' })
        .max(255, { message: 'El título de la unidad no puede exceder los 255 caracteres' }),

    objetivo: z.string()
        .min(1, { message: 'Ingrese el Objetivo' })
        .max(1200, { message: 'El objetivo no puede exceder los 1200 caracteres' })
        .nullable(),

    id_habilidad: z.number({ message: 'Campo obligatorio' }).int().nonnegative().nullable(),
    id_verbo: z.number({ message: 'Campo obligatorio' }).int().nonnegative().nullable(),

    id_actividad_presencial: z.number({ message: 'Campo obligatorio' }).int().nonnegative().nullable(),
    id_actividad_tarea: z.number({ message: 'Campo obligatorio' }).int().nonnegative().nullable(),

    descripcion_actividad_presencial: z.string()
        .min(1, { message: 'Ingrese una descripción para la actividad presencial' })
        .max(600, { message: 'La descripción de la actividad presencial no puede exceder los 600 caracteres' })
        .nullable(),

    descripcion_actividad_tarea: z.string()
        .min(1, { message: 'Ingrese una descripción para la tarea' })
        .max(600, { message: 'La descripción de la tarea no puede exceder los 600 caracteres' })
        .nullable(),

    evidencia_presencial: z.string()
        .min(1, { message: 'Ingrese la evidencia para la actividad presencial' })
        .max(300, { message: 'La evidencia de la actividad presencial no puede exceder los 300 caracteres' })
        .nullable(),

    evidencia_tarea: z.string()
        .min(1, { message: 'Ingrese la evidencia para la tarea' })
        .max(300, { message: 'La evidencia de la tarea no puede exceder los 300 caracteres' })
        .nullable(),
});
export type UnidadType = z.infer<typeof UnidadScheme>;

export const UnidadTituloScheme = UnidadScheme.pick({
    unidad: true,
});
export type UnidadTituloType = z.infer<typeof UnidadTituloScheme>;

export const UnidadDetallesScheme = UnidadScheme.pick({
    objetivo: true,
    id_habilidad: true,
    id_verbo: true,
    id_actividad_presencial: true,
    id_actividad_tarea: true,
    descripcion_actividad_presencial: true,
    descripcion_actividad_tarea: true,
    evidencia_presencial: true,
    evidencia_tarea: true,
});
export type UnidadDetallesType = z.infer<typeof UnidadDetallesScheme>;


export const UnidadMiniScheme = UnidadScheme.pick({
    id: true,
    id_curso: true,
    numero: true,
    unidad:true,
});
export type UnidadMiniType = z.infer<typeof UnidadMiniScheme>;
