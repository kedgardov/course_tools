import { z } from 'zod';
import { ApiResponseScheme } from './apiResponse';

export const InsertApiResponseScheme = ApiResponseScheme.extend({
    id: z.number().nonnegative(),
});

export type InsertApiResponseType = z.infer<typeof InsertApiResponseScheme>;
