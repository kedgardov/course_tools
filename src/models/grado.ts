import { z } from 'zod';

export const GradoScheme = z.object({
    id: z.number().int().nonnegative(),
    grado: z.string().min(1).max(40),
});
export type GradoType = z.infer<typeof GradoScheme>;
