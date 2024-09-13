import { z } from 'zod';

const WidthScheme = z.enum([
  'w-[5%]', 'w-[10%]', 'w-[15%]', 'w-[20%]', 'w-[25%]', 'w-[30%]', 'w-[35%]', 'w-[40%]',
  'w-[45%]', 'w-[50%]', 'w-[55%]', 'w-[60%]', 'w-[65%]', 'w-[70%]', 'w-[75%]', 'w-[80%]',
  'w-[85%]', 'w-[90%]', 'w-[95%]', 'w-[100%]', 'w-[8%]', 'w-[62%]'
]);

type WidthType = z.infer<typeof WidthScheme>;

export default WidthType;
