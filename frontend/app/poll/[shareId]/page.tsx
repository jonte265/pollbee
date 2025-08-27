'use client';

import ActiveBadge from '@/components/ActiveBadge';
import CtaSignUp from '@/components/CtaSignUp';
import LoadingSpin from '@/components/LoadingSpin';
import { useState, useEffect, use } from 'react';
import { motion } from 'motion/react';

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

  async function castVote(voteOption: number) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log(voteOption);

    try {
      const res = await fetch(`${apiUrl}/polls/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteoption: voteOption }),
      });

      if (!res.ok) {
        console.error('Error fetching vote poll api');
        return;
      }

      const data = await res.json();
      console.log(data);

      fetchShareData(); // Refresh after voted
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  }

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

  const totalVotes = pollData
    ? pollData.poll_options.reduce((acc, option) => acc + option.vote_count, 0)
    : 0;

  if (!loading && !pollData) {
    return (
      <main className='flex justify-center items-center font-bold'>
        No poll found.
      </main>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className='flex flex-col justify-center items-center px-4 py-8'>
        {loading && <LoadingSpin />}
        {pollData && (
          <div className='w-full max-w-3xl'>
            <h1 className='text-4xl font-bold mb-4'>{pollData.poll_title}</h1>
            <div className='flex justify-between items-center gap-4 mb-4'>
              <p className='text-gray-600 '>
                Created by <strong>{pollData.poll_creator}</strong> on{' '}
                {new Date(pollData.created_at).toLocaleDateString()}
              </p>

              <ActiveBadge isActive={pollData.is_active} />
            </div>

            <div className='flex flex-col gap-1'>
              {pollData.poll_options
                .slice()
                .sort((a, b) => a.option_text.localeCompare(b.option_text))
                .map((option) => (
                  <div
                    key={option.id}
                    className='border border-gray-300 rounded-4xl px-4 py-2 flex justify-between items-center'
                  >
                    <p className='font-semibold'>{option.option_text}</p>
                    <div className='flex items-center justify-center'>
                      <span className='text-sm text-gray-500'>
                        {option.vote_count} votes
                      </span>
                      <button
                        onClick={() => castVote(option.id)}
                        className='ml-4 px-4 py-2 bg-primary hover:bg-primary-800 text-background rounded-4xl transition-all ease-in-out'
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                ))}
              <p className='text-center text-sm text-gray-500 mt-4'>
                {totalVotes} total votes
              </p>
            </div>
          </div>
        )}
        <CtaSignUp />
      </main>
    </motion.div>
  );
}

export default SharePollPage;
