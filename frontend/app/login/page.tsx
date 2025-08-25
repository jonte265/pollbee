import LoginForm from '@/components/LoginForm';

function LoginPage() {
  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>
        Create your free account
      </h2>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
