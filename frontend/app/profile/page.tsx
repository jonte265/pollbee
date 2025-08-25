'use client';

import LoadingSpin from '@/components/LoadingSpin';
import { useEffect, useState } from 'react';

type profileDataType = {
  poll_title: string;
  is_active: boolean;
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
    <main>
      <h2>profile page</h2>
      {loading && <LoadingSpin />}
      {profileData.length > 0 &&
        profileData.map((poll, index) => <p key={index}>{poll.poll_title}</p>)}
    </main>
  );
}

export default profilePage;
