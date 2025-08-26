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

  const [loadingState, setLoadingState] = useState(false);

  async function saveChange(
    updateText: string,
    pollType: string,
    optionId?: number
  ) {
    if (!pollData) return;

    if (updateText.trim() === '') {
      return;
    }

    setLoadingState(true);

    const newUpdate: NewUpdatePoll = {
      pollid: pollData.id,
    };

    if (pollType === 'forTitle') {
      newUpdate.polltitle = updateText;
    }

    if (pollType === 'forOption') {
      newUpdate.options = updateText;
      newUpdate.optionsid = optionId;
    }

    const token = localStorage.getItem('token');

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

    await pushUpdate(newUpdate);
    await fetchPollData();
    setLoadingState(false);

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
      <h2 className='text-xl text-center font-bold'>Edit Poll</h2>

      {pollData ? (
        <div className='flex flex-col max-w-sm w-full px-4'>
          <p className=''>Title:</p>

          <div className='flex flex-col gap-2'>
            {editMode === -5 ? (
              <div className='flex gap-2'>
                <input
                  disabled={loadingState}
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                  type='text'
                  placeholder={pollData.poll_title}
                  className='flex-grow rounded-4xl p-2 pl-4 bg-primary-50'
                />
                {loadingState ? (
                  <LoadingSpin />
                ) : (
                  <div className='flex items-center justify-center gap-4'>
                    <button onClick={() => saveChange(updateText, 'forTitle')}>
                      <FaCheck />
                    </button>
                    <button onClick={cancelEdit}>
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex justify-between items-center gap-4'>
                <p className=''>{pollData.poll_title}</p>
                <button
                  onClick={() => setEditMode(-5)}
                  className='font-bold px-4 py-2 bg-primary-50 hover:bg-primary-100 hover:underline rounded-4xl  transition-all ease-in-out'
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <p className='mt-4'>Options:</p>
          <div className='flex flex-col gap-2'>
            {pollData.poll_options.map((opt, index) =>
              editMode === opt.id ? (
                <div className='flex gap-2' key={opt.id}>
                  <input
                    disabled={loadingState}
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                    type='text'
                    placeholder={opt.option_text}
                    className='flex-grow rounded-4xl p-2 pl-4 bg-primary-50'
                  />
                  {loadingState ? (
                    <LoadingSpin />
                  ) : (
                    <div className='flex items-center justify-center gap-4'>
                      <button
                        onClick={() =>
                          saveChange(updateText, 'forOption', opt.id)
                        }
                      >
                        <FaCheck />
                      </button>
                      <button onClick={cancelEdit}>
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={opt.id}
                  className='flex justify-between items-center gap-4'
                >
                  <p className=''>{opt.option_text}</p>
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
