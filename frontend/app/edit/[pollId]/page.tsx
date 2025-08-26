'use client';

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';

type EditPollParams = Promise<{
  pollId: string;
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

function EditPoll({ params }: { params: EditPollParams }) {
  const router = useRouter();

  const { pollId } = use(params);

  const [pollData, setPollData] = useState<PollData | null>(null);
  const [pollTitle, setPollTitle] = useState('');
  const [active, setActive] = useState(true);
  const [options, setOptions] = useState<string[]>(['']);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const enterEditMode = () => {
    console.log('yo');
    setEditMode(true);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Get poll information
  async function fetchShareData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/polls/${pollId}`);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const newPoll = {
      polltitle: pollTitle,
      active: active,
      options: options.filter((opt) => opt.trim() !== ''), // remove empty options
    };

    try {
      const token = localStorage.getItem('token'); // Get jwt token localstorage

      const res = await fetch(`${apiUrl}/polls`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoll),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`${data.message || 'Error editing poll'} ❌`);
        return;
      }

      setPollTitle('');
      setOptions(['']);
      setMessage('Edited poll! 🐝');
      setTimeout(() => router.push('/profile'), 2000);
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h2 className='text-xl text-center font-bold'>Edit a poll</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center gap-4 max-w-sm w-full'
      >
        <p>Title:</p>
        {editMode ? (
          <div className='flex gap-4 justify-between items-center'>
            <input
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              type='text'
              placeholder='Poll Title'
              className='w-full rounded-4xl p-2 pl-4 bg-primary-50'
            />
            <div className='flex gap-4'>
              <button>✔️</button>
              <button>✖️</button>
            </div>
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              value={pollData ? pollData.poll_title : 'null'}
              readOnly
              onChange={(e) => setPollTitle(e.target.value)}
              type='text'
              className='rounded-4xl p-2 pl-4 '
            />
            <button
              onClick={enterEditMode}
              className='font-bold px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-4xl  transition-all ease-in-out'
            >
              Edit
            </button>
          </div>
        )}

        <p>Options:</p>
        {options.map((opt, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <input
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              type='text'
              placeholder={`Option ${index + 1}`}
              className='flex-1 rounded-4xl p-2 pl-4 bg-primary-50'
            />
            {options.length > 1 && (
              <button
                type='button'
                onClick={() => removeOption(index)}
                className='text-red-500 font-bold px-2'
              >
                🗑
              </button>
            )}
          </div>
        ))}

        <button
          type='button'
          onClick={addOption}
          className='text-sm text-primary font-bold hover:underline self-start'
        >
          + Add Option
        </button>

        {!loading ? (
          <button
            type='submit'
            className='bg-primary text-background font-bold rounded-4xl px-4 py-2 hover:bg-primary-700 transition-all ease-in-out'
          >
            Save Poll
          </button>
        ) : (
          <button
            disabled
            className='bg-primary-100 text-background font-bold rounded-4xl px-4 py-2 transition-all ease-in-out'
          >
            Editing...
          </button>
        )}
      </form>

      {loading && <LoadingSpin />}
      {message && <p>{message}</p>}
    </main>
  );
}

export default EditPoll;
