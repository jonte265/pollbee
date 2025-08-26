import Link from 'next/link';
import { useEffect, useState } from 'react';

function CtaSignUp() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');

    if (tokenLocal) {
      setSignedIn(true);
    }
  }, []);

  if (signedIn) {
    return null;
  }

  return (
    <section className='flex flex-col justify-center items-center gap-2 py-32'>
      <h3>Want to create and share your own polls?</h3>
      <Link href='/signup'>
        <button className='px-6 py-2 border border-primary text-primary rounded-3xl font-semibold hover:bg-primary hover:text-background transition'>
          Sign Up
        </button>
      </Link>
    </section>
  );
}

export default CtaSignUp;
