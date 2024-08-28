import { z } from 'zod';

export const ProgramaScheme = z.object({
    id: z.number().int().nonnegative(),
    programa: z.string().max(50),
});

export type ProgramaType = z.infer<typeof ProgramaScheme>;
