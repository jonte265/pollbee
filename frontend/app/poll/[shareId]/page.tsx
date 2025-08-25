'use client';

import { useState, useEffect, use } from 'react';

type SharePollParams = Promise<{
  shareId: string;
}>;

function SharePollPage({ params }: { params: SharePollParams }) {
  const [loading, setLoading] = useState(false);

  const { shareId } = use(params);

  async function fetchShareData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem('token'); // Get jwt token localstorage

    setLoading(true);

    const res = await fetch(`${apiUrl}/polls/${shareId}`);

    if (!res.ok) {
      console.log('Error, not ok');
    }

    const data = await res.json();
    console.log(data);
    // setProfileData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchShareData();
  }, []);

  return (
    <main>
      <h1>Share poll{shareId}</h1>
    </main>
  );
}

export default SharePollPage;
