import Link from 'next/link';

function Header() {
  return (
    <header className='flex justify-between items-center pb-4'>
      <Link href='/'>
        <h1 className='font-bold text-2xl'>PollBee 🐝</h1>
      </Link>
      <Link href='/login'>
        <p className='font-bold'>Login</p>
      </Link>
    </header>
  );
}

export default Header;
