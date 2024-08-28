import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(1,'Ingresa tu usuario'),
    password: z.string().min(1, 'Ingresa tu contraseña'),
});

export type signInType = z.infer<typeof signInSchema>;
