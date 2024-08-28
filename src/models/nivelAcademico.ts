import { z } from 'zod';

export const NivelAcademicoScheme = z.object({
    id: z.number().int().nonnegative(),
    nivel_academico: z.string().max(20),
});

export type NivelAcademicoType = z.infer<typeof NivelAcademicoScheme>;
