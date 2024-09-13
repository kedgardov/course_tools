import { z } from 'zod';

export const TipoCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    tipo: z.string({message:'Debe contener texto'}).min(1,{message:'Minimo 1 caracter'}).max(15,{message: 'Maximo 15 caracteres'}).nullable(),
});
export type TipoCursoType = z.infer<typeof TipoCursoScheme>;
