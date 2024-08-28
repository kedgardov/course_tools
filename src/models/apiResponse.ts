import { z } from 'zod';

export const ApiResponseScheme = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type ApiResponseType = z.infer<typeof ApiResponseScheme>;
