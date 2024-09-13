import { z } from 'zod';

export const LGACCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    id_lgac:  z.number().int().nonnegative(),
    id_nivel_curricular:  z.number().int().nonnegative(),
    id_programa:  z.number().int().nonnegative(),
});
export type LGACCursoType = z.infer<typeof LGACCursoScheme>;


export const LGACCursoDataScheme = LGACCursoScheme.pick({
    id_lgac: true,
    id_nivel_curricular: true,
    id_programa: true,
});
export type LGACCursoDataType = z.infer<typeof LGACCursoDataScheme>;
