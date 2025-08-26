'use client';

import Link from 'next/link';
import PrimaryBtn from './PrimaryBtn';
import { useState, useEffect } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function signOutUser() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className='flex justify-between items-center pb-16'>
      <Link href='/'>
        <h1 className='font-bold text-2xl'>PollBee 🐝</h1>
      </Link>
      {isLoggedIn ? (
        <div className='flex gap-2 justify-center items-center'>
          <Link href='/profile'>
            <button className='font-bold px-4 py-2 hover:bg-background-50 rounded-4xl'>
              Profile
            </button>
          </Link>

          <button
            onClick={signOutUser}
            className='font-bold px-4 py-2 hover:bg-background-50 rounded-4xl'
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className='flex gap-2 justify-center items-center'>
          <Link href='/login'>
            <button className='font-bold px-4 py-2 hover:bg-background-50 rounded-4xl'>
              Login
            </button>
          </Link>
          <Link href='/signup'>
            <PrimaryBtn btnText='Sign Up' />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
