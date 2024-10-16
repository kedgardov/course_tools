import { z } from 'zod';

export const HabilidadScheme = z.object({
    id: z.number().int().nonnegative({message:'Introduzca una nueva habilidad'}),
    id_grupo_habilidad: z.number().int().nonnegative(),
    habilidad: z.string().max(50),
});

export type HabilidadType = z.infer<typeof HabilidadScheme>;

export const HabilidadCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso:  z.number({ message: 'Este campo es obligatorio' }).int().nonnegative(),
    id_habilidad: z.number({ message: 'Este campo es obligatorio' }).int().nonnegative( {message:'Introduzca una nueva habilidad'} ),
    id_grupo_habilidad: z.number({ message: 'Este campo es obligatorio' }).int().nonnegative(),
});
export type HabilidadCursoType = z.infer<typeof HabilidadCursoScheme>;

export const HabilidadCursoDataScheme = HabilidadCursoScheme.pick({
    id_habilidad: true,
    id_grupo_habilidad: true,
});
export type HabilidadCursoDataType = z.infer<typeof HabilidadCursoDataScheme>;
