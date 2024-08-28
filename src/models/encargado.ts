import { z } from 'zod';

export const EncargadoScheme = z.object({
    id: z.number().nonnegative().int(),
    id_rol: z.number({message: 'Selecciona un Rol'}).nonnegative().int(),
    id_curso: z.number().nonnegative().int(),
    id_maestro: z.number({ message: 'Selecciona un docente' }).nonnegative().int(),
});
export type EncargadoType = z.infer<typeof EncargadoScheme>;

export const EncargadoDataScheme = EncargadoScheme.pick({
    id_maestro: true,
    id_rol: true,
});
export type EncargadoDataType = z.infer<typeof EncargadoDataScheme>;
