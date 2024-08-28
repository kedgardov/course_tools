import { z } from 'zod';

export const OpcionTerminalScheme = z.object({
    id: z.number().int().nonnegative(),
    opcion_terminal: z.string().max(80),
});

export type OpcionTerminalType = z.infer<typeof OpcionTerminalScheme>;
