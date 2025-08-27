'use client';

import LoadingSpin from '@/components/LoadingSpin';
import PollCard from '@/components/PollCard';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';
import { useRouter } from 'next/navigation';
import { FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'motion/react';

type profileDataType = {
  poll_title: string;
  is_active: boolean;
  share_id: string;
  created_at: string;
};

function ProfilePage() {
  // Redirect if not logged in
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [userNameLocal, setUserNameLocal] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // Get jwt token localstorage

  const [askDelete, setAskDelete] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const tok = localStorage.getItem('token');

    setUserNameLocal(username);
    setToken(tok);

    if (!tok) {
      router.push('/login');
    }
  }, []);

  async function deleteAccount(userDelete: string) {
    console.log(userDelete);

    const res = await fetch(`${apiUrl}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userDelete,
      }),
    });

    if (!res.ok) {
      console.log('Error, not ok fail delete account');
    }

    const data = await res.json();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // router.push('/');
    window.location.href = '/'; // Refresh window
  }

  const [profileData, setProfileData] = useState<profileDataType[]>([]);

  const [loading, setLoading] = useState(false);

  async function fetchProfileData() {
    setLoading(true);

    const res = await fetch(`${apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log('Error, not ok');
    }

    const data = await res.json();
    console.log(data);
    setProfileData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchProfileData();
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className='flex flex-col justify-center items-center gap-8'>
        <div className='flex flex-col gap-2 text-center'>
          <h2 className='text-2xl font-semibold'>Welcome {userNameLocal}!</h2>
          <h3 className='text-xl font-semibold'>Your polls:</h3>
        </div>

        <Link href='/create-poll'>
          <PrimaryBtn btnText='Create poll' />
        </Link>

        {loading && <LoadingSpin />}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32'>
          {profileData.length > 0 &&
            profileData.map((poll, index) => (
              <PollCard
                key={index}
                poll_title={poll.poll_title}
                is_active={poll.is_active}
                share_id={poll.share_id}
                created_at={poll.created_at}
              />
            ))}
        </div>
        {userNameLocal && askDelete === false && (
          <button
            onClick={() => setAskDelete(true)}
            className={`flex justify-center items-center gap-2 bg-red-500 text-background font-bold rounded-4xl px-4 py-2 hover:bg-red-700 transition-all ease-in-out`}
          >
            <FaExclamationTriangle /> Delete Account
          </button>
        )}
        {askDelete && (
          <div>
            <p className='text-center'>
              Are you sure you want to delete your account? <br />
              This will permanently delete all your data
            </p>
            <div className='flex flex-row gap-2 pt-4'>
              <button
                onClick={() => {
                  if (userNameLocal) deleteAccount(userNameLocal);
                }}
                className={`flex justify-center items-center gap-2 bg-red-500 text-background font-bold rounded-4xl px-4 py-2 hover:bg-red-700 transition-all ease-in-out`}
              >
                Yes, delete account.
              </button>
              <button
                onClick={() => setAskDelete(false)}
                className={`flex justify-center items-center gap-2 bg-text text-background font-bold rounded-4xl px-4 py-2 hover:bg-text-700 transition-all ease-in-out`}
              >
                No, keep my account.
              </button>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}

export default ProfilePage;
