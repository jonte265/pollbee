import LoginForm from '@/components/LoginForm';

function LoginPage() {
  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>Login </h2>
      <LoginForm submitBtnText='Login' />
    </main>
  );
}

export default LoginPage;
