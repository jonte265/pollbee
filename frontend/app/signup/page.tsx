'use client';

import { useState } from 'react';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('go');

    e.preventDefault();
    console.log('go2');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);

    try {
      const res = await fetch(`${apiUrl}/`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>
        Create your free account
      </h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center gap-4 max-w-sm w-full'
      >
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
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default SignupPage;
