import { z } from 'zod';

export const PronaceScheme = z.object({
    id: z.number().int().nonnegative(),
    pronace: z.string().min(1).max(40),
});
export type PronaceType = z.infer<typeof PronaceScheme>;
