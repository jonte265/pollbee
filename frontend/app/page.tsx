import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';

export default function Home() {
  return (
    <main className='flex flex-col justify-center items-center gap-8 max-w-xl mx-auto p-6 text-center'>
      <h1 className='text-4xl font-extrabold mb-4'>PollBee 🐝</h1>
      <p className='text-lg text-gray-700'>
        Create and share live polls easily. Build your profile to manage all
        your polls in one place.
      </p>
      <div className='flex gap-4 mt-6'>
        <Link href='/signup'>
          <button className='px-6 py-2 border border-primary text-primary rounded-3xl font-semibold hover:bg-primary hover:text-background transition'>
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
