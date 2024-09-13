import { z } from 'zod';

export const ComiteDirectivoScheme = z.object({
    id: z.number().int().nonnegative({ message: 'ID debe ser un número entero no negativo.' }),
    id_maestro: z.number().int().nonnegative({ message: 'ID del maestro debe ser un número entero no negativo.' }).nullable(),
    id_tesis: z.number().int().nonnegative({ message: 'ID de la tesis debe ser un número entero no negativo.' }).nullable(),
    id_rol_tesis: z.number().int().nonnegative({ message: 'ID del rol de tesis debe ser un número entero no negativo.' }).nullable(),
});

export type ComiteDirectivoType = z.infer<typeof ComiteDirectivoScheme>;
