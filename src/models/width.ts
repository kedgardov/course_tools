import { z } from 'zod';

const WidthScheme = z.enum(['w-[8%]', 'w-[62%]', 'w-[10%]', 'w-[20%]', 'w-[30%]', 'w-[40%]', 'w-[50%]',
                            'w-[60%]', 'w-[70%]', 'w-[80%]', 'w-[90%]', 'w-[100%]',
                            'w-[25%]',]);

type WidthType = z.infer<typeof WidthScheme>;

export default WidthType;
