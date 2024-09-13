import { z } from 'zod';


export const OpcionTerminalCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    id_opcion_terminal:  z.number({message: 'Campo obligatorio'}).int().nonnegative(),
    id_programa:  z.number({message: 'Campo obligatorio'}).int().nonnegative(),
    id_nivel_curricular:  z.number({message: 'Campo obligatorio'}).int().nonnegative(),
});
export type OpcionTerminalCursoType = z.infer<typeof OpcionTerminalCursoScheme>;

export const OpcionTerminalCursoDataScheme = OpcionTerminalCursoScheme.pick({
    id_opcion_terminal: true,
    id_programa: true,
    id_nivel_curricular: true,
});
export type OpcionTerminalCursoDataType = z.infer<typeof OpcionTerminalCursoDataScheme>;
