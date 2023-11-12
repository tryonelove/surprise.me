import { LoginForm } from '@/components/login/LoginForm';

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-3 p-24'>
      <div className='w-1/3'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password to login to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
