import { z } from 'zod';

export const ModalidadCursoScheme = z.object({
    id: z.number().int().nonnegative(),
    modalidad: z.string({message:'Debe contener texto'}).min(1,{message:'Minimo 1 caracter'}).max(15,{message: 'Maximo 15 caracteres'}).nullable(),
});
export type ModalidadCursoType = z.infer<typeof ModalidadCursoScheme>;
