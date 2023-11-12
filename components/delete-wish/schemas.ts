import { z } from 'zod';

export const deleteWishSchema = z.object({
  id: z.string().min(1),
  wish: z.string().min(1),
});

export type DeleteWishFormValues = z.infer<typeof deleteWishSchema>;
