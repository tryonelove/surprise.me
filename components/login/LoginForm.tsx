'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from './actions';
import { LoginFormValues, loginSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { LoginFormField } from './LoginFormField';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { getErrorMessageFor } from './getErrorMessageFor';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {pending ? 'Loading...' : 'Login'}
    </Button>
  );
}

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [state, action] = useFormState(authenticate, undefined);

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' action={action}>
        <FormField
          name={LoginFormField.Email}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder='Enter your email'
                  type='email'
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={LoginFormField.Password}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder='Enter password'
                  type='password'
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoginButton />
        {state?.type === 'failure' && state.message && (
          <p className='text-red-500'>{getErrorMessageFor(state.message)}</p>
        )}
      </form>
    </Form>
  );
}
