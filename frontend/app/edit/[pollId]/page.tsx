'use client';

import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';
import { FaCheck, FaTimes } from 'react-icons/fa';

type EditPollParams = Promise<{
  pollId: string;
}>;

type PollDataType = {
  poll_title: string;
};

function EditPoll({ params }: { params: EditPollParams }) {
  const [pollData, setPollData] = useState<PollDataType | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { pollId } = use(params);

  async function fetchPollData() {
    try {
      const res = await fetch(`${apiUrl}/polls/${pollId}`);
      const data = await res.json();

      console.log(data);
      setPollData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPollData();
  }, [pollId]);

  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl'>Edit Poll</h2>
      {pollData ? (
        <div>
          <p>Title:</p>
          <p>{pollData.poll_title}</p>
          <p>Options:</p>
          <p>{pollData.poll_options[0].option_text}</p>
        </div>
      ) : (
        <LoadingSpin />
      )}
    </main>
  );
}

export default EditPoll;
