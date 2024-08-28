import { z } from 'zod';


const ParametersScheme = z.object({
    id: z.preprocess((val) => Number(val), z.number().int().positive()),
});

export const parseId = (id: string): number | null => {
    const result = ParametersScheme.safeParse({ id: id });
    if (!result.success) {
        console.error(result.error);
        return null;
    }
    return result.data.id;
};
