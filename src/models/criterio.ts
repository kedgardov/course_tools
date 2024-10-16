import { z } from 'zod';


export const CriterioScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    criterio: z.string({message:'Ingrese un criterio'}).min(1,{message:'Ingrese un Criterio'}).max(50, {message: 'Maximo 50 caracteres'}),
    valor: z.number({message:'Ingrese un numero'}).int({message:'Solo numeros enteros'}).positive({message: 'Solo numeros positivos'}).max(100, {message:'Maximo 100%'}),
});
export type CriterioType = z.infer<typeof CriterioScheme>;

export const CriterioDataScheme = CriterioScheme.pick({
    criterio: true,
    valor: true,
});
export type CriterioDataType = z.infer<typeof CriterioDataScheme>;
