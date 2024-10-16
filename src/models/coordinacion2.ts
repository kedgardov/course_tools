import { z } from 'zod';

export const Coordinacion2Scheme = z.object({
    id: z.number().int().nonnegative(),
    coordinacion_2: z.string().min(1).max(255),
});
export type Coordinacion2Type = z.infer<typeof Coordinacion2Scheme>;
