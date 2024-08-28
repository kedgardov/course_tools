import { z } from 'zod';

export const LGACScheme = z.object({
    id: z.number().int().nonnegative(),
    lgac: z.string().max(80),
});

export type LGACType = z.infer<typeof LGACScheme>;
