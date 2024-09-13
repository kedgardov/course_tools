import { z } from 'zod';

export const RolTesisScheme = z.object({
    id: z.number().int().nonnegative(),
    rol_tesis: z.string().min(1).max(15),
});
export type RolTesisType =  z.infer<typeof RolTesisScheme>;
