import LoginForm from '@/components/LoginForm';

function SignupPage() {
  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>
        Create your free account
      </h2>
      <LoginForm submitBtnText='Sign Up' />
    </main>
  );
}

export default SignupPage;
