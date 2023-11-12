import { z } from 'zod';
import { LoginFormField } from './LoginFormField';

export const loginSchema = z.object({
  [LoginFormField.Email]: z.string().email(),
  [LoginFormField.Password]: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
