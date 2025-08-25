import Link from 'next/link';
import PrimaryBtn from './PrimaryBtn';

function Header() {
  return (
    <header className='flex justify-between items-center pb-4'>
      <Link href='/'>
        <h1 className='font-bold text-2xl'>PollBee 🐝</h1>
      </Link>
      <div className='flex gap-4 justify-center items-center'>
        <Link href='/login'>
          <button className='font-bold'>Login</button>
        </Link>
        <Link href='/login'>
          <PrimaryBtn btnText='Sign Up' bgColor='primary2' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
