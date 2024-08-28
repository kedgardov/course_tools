import { z } from 'zod';

export const RolScheme = z.object({
    id: z.number().int().nonnegative(),
    rol: z.string().min(1).max(15),
});
export type RolType =  z.infer<typeof RolScheme>;
