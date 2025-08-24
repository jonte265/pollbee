'use client';

function LoginForm() {
  return (
    <form className='flex flex-col justify-center gap-4'>
      <input
        type='text'
        placeholder='Username'
        className='rounded-4xl p-2 text-center bg-text-50'
      />
      <input
        type='password'
        placeholder='Password'
        className='rounded-4xl p-2 text-center bg-text-50'
      />
      <button type='submit' className='bg-secondary rounded-4xl p-4'>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
