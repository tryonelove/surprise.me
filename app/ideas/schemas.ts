import { z } from 'zod';

export const createIdeaSchema = z.object({
  idea: z.string().min(2, {
    message: 'Idea must be at least 2 characters',
  }),
});

export type CreateIdeaFormValues = z.infer<typeof createIdeaSchema>;

export const deleteIdeaSchema = z.object({
  id: z.coerce.number(),
  idea: z.string().min(1),
});

export type DeleteIdeaFormValues = z.infer<typeof deleteIdeaSchema>;
