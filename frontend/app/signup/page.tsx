'use client';

import { useState } from 'react';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const newUser = {
      username: username,
      password: password,
    };

    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log('Respond not ok, problem');
        setMessage(`${data.message} ❌`);
        return;
      }

      setUsername('');
      setPassword('');
      setMessage('Registration successful, welcome aboard ✅');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
          className='rounded-4xl p-2 pl-4 bg-background-50'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      {loading && (
        <div className='w-8 h-8 border-4 border-primary-300 border-dashed rounded-full animate-spin mx-auto'></div>
      )}

      {message && <p>{message}</p>}
    </main>
  );
}

export default SignupPage;
