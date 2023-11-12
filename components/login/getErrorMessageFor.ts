import { LoginError } from './LoginError';

export function getErrorMessageFor(error: LoginError) {
  switch (error) {
    case LoginError.InvalidCredentials:
      return 'Invalid credentials. Please try again.';
  }
}
