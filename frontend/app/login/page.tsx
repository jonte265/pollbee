'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';

function LoginPage() {
  const router = useRouter();

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
      const res = await fetch(`${apiUrl}/login`, {
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

      console.log(data);

      localStorage.setItem('token', data.token);

      setUsername('');
      setPassword('');
      setMessage('Login successful, welcome back 🐝');
      // router.push('/profile');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>Log into your account</h2>
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
        {!loading ? (
          <button
            type='submit'
            className='bg-primary text-background font-bold rounded-4xl px-4 py-2 hover:bg-primary-700 transition-all ease-in-out'
          >
            Login
          </button>
        ) : (
          <button
            disabled
            className='bg-primary-100 text-background font-bold rounded-4xl px-4 py-2 transition-all ease-in-out'
          >
            Login
          </button>
        )}
      </form>
      {loading && <LoadingSpin />}

      {message && <p>{message}</p>}
    </main>
  );
}

export default LoginPage;
