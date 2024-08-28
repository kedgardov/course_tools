import { z } from 'zod';


export const TipoFuenteScheme = z.object({
    id: z.number().int().nonnegative(),
    tipo_fuente: z.string().max(30),
});
export type TipoFuenteType = z.infer<typeof TipoFuenteScheme>;
