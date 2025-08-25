'use client';

import LoadingSpin from '@/components/LoadingSpin';
import { useState, useEffect, use } from 'react';

type SharePollParams = Promise<{
  shareId: string;
}>;

type PollOption = {
  id: number;
  option_text: string;
  vote_count: number;
};

type PollData = {
  poll_title: string;
  poll_creator: string;
  is_active: boolean;
  created_at: string;
  poll_options: PollOption[];
};

function SharePollPage({ params }: { params: SharePollParams }) {
  const [loading, setLoading] = useState(false);
  const [pollData, setPollData] = useState<PollData | null>(null);

  const { shareId } = use(params);

  async function fetchShareData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/polls/${shareId}`);

      if (!res.ok) {
        console.error('Error fetching poll');
        return;
      }

      const data = await res.json();
      console.log(data);
      setPollData(data);
    } catch (err) {
      console.error('Failed to fetch poll data:', err);
    } finally {
      setLoading(false);
      console.log(pollData);
    }
  }

  useEffect(() => {
    fetchShareData();
  }, []);

  if (!loading && !pollData) {
    return (
      <main className='flex justify-center items-center font-bold'>
        No poll found.
      </main>
    );
  }

  return (
    <main className='flex flex-col justify-center'>
      {loading && <LoadingSpin />}
      {pollData && (
        <div>
          <h1 className='text-4xl font-bold mb-4'>{pollData.poll_title}</h1>
          <div className='flex justify-between items-center gap-4 mb-4'>
            <p className='text-gray-600 '>
              Created by <strong>{pollData.poll_creator}</strong> on{' '}
              {new Date(pollData.created_at).toLocaleDateString()}
            </p>

            <p
              className={`py-1 px-2 rounded-4xl text-sm font-semibold ${
                pollData.is_active ? 'bg-green-200' : 'bg-red-200'
              }`}
            >
              {pollData.is_active ? 'Active' : 'Closed'}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            {pollData.poll_options.map((option) => (
              <div
                key={option.id}
                className='border border-gray-300 rounded-4xl px-4 py-2 flex justify-between items-center'
              >
                <span>{option.option_text}</span>
                <span className='text-sm text-gray-500'>
                  {option.vote_count} votes
                </span>
                <button className='ml-4 px-4 py-2 bg-primary hover:bg-primary-800 text-background rounded-4xl'>
                  Vote
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default SharePollPage;
