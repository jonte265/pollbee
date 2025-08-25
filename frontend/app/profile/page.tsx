'use client';

import LoadingSpin from '@/components/LoadingSpin';
import PollCard from '@/components/PollCard';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';

type profileDataType = {
  poll_title: string;
  is_active: boolean;
  share_id: string;
  created_at: string;
};

function profilePage() {
  const [profileData, setProfileData] = useState<profileDataType[]>([]);

  const [loading, setLoading] = useState(false);

  async function fetchProfileData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem('token'); // Get jwt token localstorage

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
    fetchProfileData();
  }, []);

  return (
    <main className='flex flex-col justify-center items-center gap-16'>
      <h2 className='text-2xl'>Your polls:</h2>

      <Link href='/create-poll'>
        <PrimaryBtn btnText='Create poll' />
      </Link>

      {loading && <LoadingSpin />}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
    </main>
  );
}

export default profilePage;
