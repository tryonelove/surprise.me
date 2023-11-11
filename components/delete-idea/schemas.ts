import { z } from 'zod';

export const deleteIdeaSchema = z.object({
  id: z.string().min(1),
  idea: z.string().min(1),
});

export type DeleteIdeaFormValues = z.infer<typeof deleteIdeaSchema>;
