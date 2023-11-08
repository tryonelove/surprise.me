import { z } from 'zod';
import { CreateIdeaFormField } from './CreateIdeaFormField';

export const createIdeaSchema = z.object({
  [CreateIdeaFormField.Idea]: z.string().min(2, {
    message: 'Idea must be at least 2 characters',
  }),
  [CreateIdeaFormField.Preview]: z.unknown().optional(),
});

export type CreateIdeaFormValues = z.infer<typeof createIdeaSchema>;
