import { z } from 'zod';

export const AutorFuenteScheme = z.object({
  id: z.number().int().nonnegative(),
  id_fuente: z.number().int().nonnegative(),
  nombre: z.string().max(120).min(1, { message: 'Nombre es requerido' }),
  apellido: z.string().max(120).min(1, { message: 'Apellido es requerido' }),
});
export type AutorFuenteType = z.infer<typeof AutorFuenteScheme>;

export const TipoFuenteScheme = z.object({
  id: z.number().int().nonnegative(),
  tipo_fuente: z.string().min(1).max(40),
  tipo_fuente_type: z.string().min(1).max(40),
});
export type TipoFuenteType = z.infer<typeof TipoFuenteScheme>;

export const catalogoTiposFuentes: TipoFuenteType[] = [
  {id:1, tipo_fuente: 'Libro', tipo_fuente_type:'book'},
  {id:2, tipo_fuente: 'Articulo Cientifico', tipo_fuente_type:'journal'},
  {id:3, tipo_fuente: 'Tesis', tipo_fuente_type:'thesis'},
  {id:4, tipo_fuente: 'Pagina Web', tipo_fuente_type:'webpage'},
];

export const FuenteSchemeBase = z
  .object({
    id: z.number().int().nonnegative(),
    DOI: z.string().optional().nullable(),
    id_curso: z.number().int().nonnegative(),
    id_tipo: z.number({ message: 'Seleccione un tipo de fuente' }).int().nonnegative(),
    title: z
      .string({ required_error: 'Ingrese un título válido' })
      .min(1, { message: 'Ingrese un título válido' })
      .max(600, { message: 'Título debe contener un máximo de 600 caracteres' }),
    issued: z
      .number({ required_error: 'Ingrese el año de publicación' })
      .min(1900, { message: 'Solo se permiten citas a partir del 1900' })
      .max(new Date().getFullYear(), { message: 'No se permiten fechas futuras' })
      .nullable()
      .optional(),
    publisher: z.string().max(120).optional().nullable(),
    publisher_place: z.string().max(120).optional().nullable(),
    volume: z.string().max(20).optional().nullable(),
    issue: z.string().max(20).optional().nullable(),
    pages: z.string().max(12).optional().nullable(),
    URL: z
      .string()
      .optional()
      .nullable(),
    accessed: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Fecha de acceso inválida' })
      .optional()
      .nullable(),
    institution: z.string().max(120).optional().nullable(),
  })


export const FuenteScheme = FuenteSchemeBase.superRefine((data, ctx) => {
    const { id_tipo } = data;

    if (id_tipo === 1) {
      // Book
      if (!data.publisher) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['publisher'],
          message: 'Editorial es requerida para libros.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en libros',
        });
      }
    } else if (id_tipo === 2) {
      // Journal Article
      if (!data.publisher) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['publisher'],
          message: 'Nombre del journal es requerido.',
        });
      }
      if (!data.volume) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['volume'],
          message: 'Volumen es requerido.',
        });
      }
      if (!data.pages) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['pages'],
          message: 'Páginas son requeridas.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en articulos',
        });
      }
    } else if (id_tipo === 4) {
      // Webpage
      if (!data.URL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['URL'],
          message: 'URL es requerida para páginas web.',
        });
      }
      if (!data.accessed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['accessed'],
          message: 'Fecha de acceso es requerida para páginas web.',
        });
      }
    } else if (id_tipo === 3) {
      // Thesis
      if (!data.institution) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['institution'],
          message: 'Institución es requerida para tesis.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en tesis',
        });
      }
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['id_tipo'],
        message: 'Tipo de fuente inválido.',
      });
    }
  });

export type FuenteType = z.infer<typeof FuenteScheme>;

export const FuenteDataSchemeBase = FuenteSchemeBase.omit({
  id: true,
  id_curso: true,
});

export const FuenteDataScheme = FuenteDataSchemeBase.superRefine((data, ctx) => {
    const { id_tipo } = data;

    if (id_tipo === 1) {
      // Book
      if (!data.publisher) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['publisher'],
          message: 'Editorial es requerida para libros.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en libros',
        });
      }

    } else if (id_tipo === 2) {
      // Journal Article
      if (!data.publisher) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['publisher'],
          message: 'Nombre del journal es requerido.',
        });
      }
      if (!data.volume) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['volume'],
          message: 'Volumen es requerido.',
        });
      }
      if (!data.pages) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['pages'],
          message: 'Páginas son requeridas.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en Articulos',
        });
      }


    } else if (id_tipo === 4) {
      // Webpage
      if (!data.URL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['URL'],
          message: 'URL es requerida para páginas web.',
        });
      }
      if (!data.accessed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['accessed'],
          message: 'Fecha de acceso es requerida para páginas web.',
        });
      }


    } else if (id_tipo === 3) {
      // Thesis
      if (!data.institution) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['institution'],
          message: 'Institución es requerida para tesis.',
        });
      }
      if ( !data.issued ){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['issued'],
          message: 'Año de publicacion es requerdio en tesis',
        });
      }


    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['id_tipo'],
        message: 'Tipo de fuente inválido.',
      });
    }
  });
export type FuenteDataType = z.infer<typeof FuenteDataScheme>;
