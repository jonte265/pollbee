'use client';

import Link from 'next/link';
import PrimaryBtn from './PrimaryBtn';
import { useState, useEffect } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState('');

  function signOutUser() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usernameLocal = localStorage.getItem('username');
    if (usernameLocal) {
      setUsername(usernameLocal);
    }

    if (token === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className='flex justify-between items-center pb-16'>
      <Link href='/'>
        <h1 className='font-bold text-xl sm:text-2xl'>PollBee 🐝</h1>
      </Link>
      {isLoggedIn ? (
        <div className='flex sm:gap-2 justify-center items-center'>
          <Link href='/profile'>
            <button className='font-bold px-4 py-2 hover:bg-primary-50 rounded-4xl transition-all ease-in-out'>
              @{username}
            </button>
          </Link>

          <button
            onClick={signOutUser}
            className='font-bold px-4 py-2 hover:bg-primary-50 rounded-4xl  transition-all ease-in-out'
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className='flex sm:gap-2 justify-center items-center'>
          <Link href='/login'>
            <button className='font-bold px-4 py-2 hover:bg-primary-50 rounded-4xl  transition-all ease-in-out'>
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
