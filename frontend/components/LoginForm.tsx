'use client';

type loginFormType = {
  submitBtnText: string;
};

function LoginForm({ submitBtnText }: loginFormType) {
  return (
    <form className='flex flex-col justify-center gap-4 max-w-sm w-full'>
      <input
        type='text'
        placeholder='Username'
        className='rounded-4xl p-2 pl-4 bg-background-50'
      />
      <input
        type='password'
        placeholder='Password'
        className='rounded-4xl p-2 pl-4  bg-background-50'
      />
      <button
        type='submit'
        className='bg-primary text-background font-bold rounded-4xl px-4 py-2 hover:bg-primary-700 transition-all ease-in-out'
      >
        {submitBtnText}
      </button>
    </form>
  );
}

export default LoginForm;
