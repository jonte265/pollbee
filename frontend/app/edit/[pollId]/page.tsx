'use client';

import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PrimaryBtn from '@/components/PrimaryBtn';

type EditPollParams = Promise<{
  pollId: string;
}>;

type PollDataType = {
  poll_title: string;
  id: number;
  poll_options: PollOptionType[];
};

type PollOptionType = {
  option_text: string;
  id: number;
};

type NewUpdatePoll = {
  pollid: number;
  polltitle?: string;
  active?: boolean;
  options?: string;
  optionsid?: number;
};

function EditPoll({ params }: { params: EditPollParams }) {
  const [pollData, setPollData] = useState<PollDataType | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { pollId } = use(params);

  const [editMode, setEditMode] = useState(-10);
  const [updateText, setUpdateText] = useState('');

  function saveChange(updateText: string, pollType: string, optionId?: number) {
    console.log(updateText);
    console.log(pollType);

    if (pollData) {
      const newUpdate = {
        pollid: pollData.id,
        polltitle: pollType === 'forTitle' ? updateText : pollData.poll_title,
        active: true,
        options:
          pollType === 'forOption'
            ? updateText
            : pollData.poll_options[0].option_text,
        optionsid: optionId ? optionId : pollData.poll_options[0].id,
      };
      console.log(newUpdate);
      const token = localStorage.getItem('token'); // Get jwt token localstorage

      async function pushUpdate(updateObj: NewUpdatePoll) {
        try {
          const res = await fetch(`${apiUrl}/polls`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateObj),
          });

          if (!res.ok) {
            console.log('Res not ok');
          }
        } catch (error) {
          console.error(error);
        }
      }
      pushUpdate(newUpdate);
    }

    setUpdateText('');
    setEditMode(-10);
  }

  function cancelEdit() {
    setEditMode(-10);
    setUpdateText('');
  }

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
        <div className='flex flex-col'>
          <p className='text-xl'>Title:</p>

          <div className='flex justify-center items-center gap-4'>
            {editMode === -5 ? (
              <div className='flex gap-2'>
                <input
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                  type='text'
                  placeholder={pollData.poll_title}
                  className='rounded-4xl p-2 pl-4 bg-primary-50'
                />

                <button onClick={() => saveChange(updateText, 'forTitle')}>
                  <FaCheck />
                </button>
                <button onClick={cancelEdit}>
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className='flex justify-center items-center gap-4'>
                <p>{pollData.poll_title}</p>
                <button
                  onClick={() => setEditMode(-5)}
                  className='font-bold px-4 py-2 bg-primary-50 hover:bg-primary-100 hover:underline rounded-4xl  transition-all ease-in-out'
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <p className='text-xl mt-4'>Options:</p>
          <div className='flex flex-col gap-2'>
            {pollData.poll_options.map((opt, index) =>
              editMode === opt.id ? (
                <div className='flex gap-2' key={opt.id}>
                  <input
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                    type='text'
                    placeholder={opt.option_text}
                    className='rounded-4xl p-2 pl-4 bg-primary-50'
                  />

                  <button
                    onClick={() => saveChange(updateText, 'forOption', opt.id)}
                  >
                    <FaCheck />
                  </button>
                  <button onClick={cancelEdit}>
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div
                  key={opt.id}
                  className='flex justify-center items-center gap-4'
                >
                  <p>{opt.option_text}</p>
                  <button
                    onClick={() => setEditMode(opt.id)}
                    className='font-bold px-4 py-2 bg-primary-50 hover:bg-primary-100 hover:underline rounded-4xl  transition-all ease-in-out'
                  >
                    Edit
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <LoadingSpin />
      )}
      <Link href='/profile'>
        <PrimaryBtn btnText='Done' />
      </Link>
    </main>
  );
}

export default EditPoll;
