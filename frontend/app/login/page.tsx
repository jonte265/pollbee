function LoginPage() {
  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>Login </h2>
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
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
