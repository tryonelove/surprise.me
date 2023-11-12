'use server';
import { signIn } from '@/auth';
import { OptionalMessageActionResult } from '@/lib/types';
import { LoginError } from './LoginError';

export async function authenticate(
  _: unknown,
  formData: FormData,
): Promise<OptionalMessageActionResult<LoginError>> {
  try {
    await signIn('credentials', Object.fromEntries(formData));

    return { type: 'success' };
  } catch (e) {
    if ((e as Error).message.includes('CredentialsSignin')) {
      return { type: 'failure', message: LoginError.InvalidCredentials };
    }

    console.error(e);

    throw e;
  }
}
