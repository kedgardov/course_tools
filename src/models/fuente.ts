import { z } from 'zod';


export const FuenteScheme = z.object({
    id: z.number().int().nonnegative(),
    id_curso: z.number().int().nonnegative(),
    id_tipo: z.number({message: 'Selecciona un tipo de fuente'}).int().nonnegative(),
    cita: z.string().max(150),
    titulo: z.string().min(1,{ message: 'Intro' }).max(100,{message:'Titulo debe contener un maximo de 100 caracteres'}),
    issued: z.number().min(1900,{message:'Muy vieja'}).max(new Date().getFullYear(),{message:'No Fecha futura'}).optional(),
    publisher: z.string().max(60).optional(),
    publisher_place: z.string().max(60).optional(),
    volume: z.string().max(4).regex(/^\d{1,4}$/).optional(),
    issue: z.string().max(4).regex(/^\d{1,4}$/).optional(),
    pages: z.string().max(12).optional(),
    DOI: z.string().optional(),
    URL: z.string().regex(/^(http:\/\/|https:\/\/)/, "URL debe comenzar con http:// o https://").optional(),
    accessed: z.string().date().optional(),
});
export type FuenteType = z.infer<typeof FuenteScheme>;

export const FuenteMiniScheme = FuenteScheme.pick({
    id: true,
    id_curso: true,
    id_tipo: true,
    cita: true,
    titulo: true,
});
export type FuenteMiniType = z.infer<typeof FuenteMiniScheme>;

export const FuenteDataScheme = FuenteScheme.pick({
    issued: true,
    publisher: true,
    publisher_place: true,
    volume: true,
    issue: true,
    pages: true,
    DOI: true,
    URL: true,
    accessed: true,
});
export type FuenteDataType = z.infer<typeof FuenteDataScheme>;

export const FuenteMiniDataScheme = FuenteMiniScheme.pick({
    id_tipo: true,
    titulo: true,
});
export type FuenteMiniDataType = z.infer<typeof FuenteMiniDataScheme>;
