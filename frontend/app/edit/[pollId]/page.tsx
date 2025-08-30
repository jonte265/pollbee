'use client';

import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PrimaryBtn from '@/components/PrimaryBtn';
import { motion } from 'motion/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { LuCircleCheckBig, LuCircle } from 'react-icons/lu';

type EditPollParams = Promise<{
  pollId: string;
}>;

type PollDataType = {
  poll_title: string;
  id: number;
  message: string;
  is_active: boolean;
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
  const [askDelete, setAskDelete] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Get jwt token localstorage

  const [updateActivePoll, setUpdateActivePoll] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const tok = localStorage.getItem('token');

    setToken(tok);

    if (!tok) {
      router.push('/login');
    }
  }, []);

  async function deletePoll(pollId: number) {
    console.log(pollId);

    const res = await fetch(`${apiUrl}/polls`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pollid: pollId,
      }),
    });

    if (!res.ok) {
      console.log('Error, not ok fail delete poll');
    }

    const data = await res.json();

    router.push('/profile');
    // window.location.href = '/profile'; // Refresh window
  }

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

  async function saveActive(act: boolean) {
    if (!pollData) return;

    console.log('save active');

    setLoadingState(true);

    const newActiveUpdate = {
      pollid: pollData.id,
      active: act,
    };

    try {
      const res = await fetch(`${apiUrl}/polls`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newActiveUpdate),
      });

      if (!res.ok) {
        console.log('Res not ok, active update');
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    await fetchPollData();
    setLoadingState(false);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {pollData?.message === 'Poll not found' ? (
        <p className='text-center text-2xl'>Poll not found</p>
      ) : (
        <main className='flex flex-col gap-8 items-center justify-center'>
          <h2 className='text-xl text-center font-bold'>Edit Poll</h2>

          {pollData ? (
            <div className='flex flex-col max-w-sm w-full px-4'>
              <p className='mb-1'>Title:</p>

              <div className='border border-gray-300 rounded-4xl px-4 py-2 flex flex-col gap-2'>
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
                        <button
                          onClick={() => saveChange(updateText, 'forTitle')}
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
                  <div className='flex justify-between items-center gap-4'>
                    <p className='font-semibold'>{pollData.poll_title}</p>
                    <button
                      onClick={() => setEditMode(-5)}
                      className='font-semibold px-4 py-2 bg-primary-50 hover:bg-primary-100 hover:underline rounded-4xl  transition-all ease-in-out'
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              <p className='mt-4 mb-1'>Options:</p>
              <div className='flex flex-col gap-2'>
                {[...pollData.poll_options]
                  .sort((a, b) => a.id - b.id)
                  .map((opt, index) =>
                    editMode === opt.id ? (
                      <div
                        className='border border-gray-300 rounded-4xl px-4 py-2 flex flex-row gap-2'
                        key={opt.id}
                      >
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
                        className='border border-gray-300 rounded-4xl px-4 py-2 flex justify-between items-center gap-4'
                      >
                        <p className='font-semibold'>{opt.option_text}</p>
                        <button
                          onClick={() => setEditMode(opt.id)}
                          className='font-semibold px-4 py-2 bg-primary-50 hover:bg-primary-100 hover:underline rounded-4xl  transition-all ease-in-out'
                        >
                          Edit
                        </button>
                      </div>
                    )
                  )}
              </div>
              <div className='flex flex-col justify-center items-center mt-4'>
                <p className='text-center'>Active?</p>
                {loadingState ? (
                  <LoadingSpin />
                ) : pollData?.is_active ? (
                  <div className='flex flex-row justify-center items-center gap-2'>
                    <button
                      onClick={() => saveActive(true)}
                      className='flex flex-row justify-center items-center gap-2 mt-4 px-4 py-2 border border-text  bg-text text-background hover:bg-text-800 rounded-4xl transition-all ease-in-out'
                    >
                      <LuCircleCheckBig />
                      Yes
                    </button>
                    <button
                      onClick={() => saveActive(false)}
                      className='flex flex-row justify-center items-center gap-2 mt-4 px-4 py-2 border border-text  hover:bg-text hover:text-background rounded-4xl transition-all ease-in-out'
                    >
                      <LuCircle />
                      No
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-row justify-center items-center gap-2'>
                    <button
                      onClick={() => saveActive(true)}
                      className='flex flex-row justify-center items-center gap-2 mt-4 px-4 py-2 border border-text  hover:bg-text hover:text-background rounded-4xl transition-all ease-in-out'
                    >
                      <LuCircle />
                      Yes
                    </button>
                    <button
                      onClick={() => saveActive(false)}
                      className='flex flex-row justify-center items-center gap-2 mt-4 px-4 py-2 border border-text  bg-text text-background hover:bg-text-800  rounded-4xl transition-all ease-in-out'
                    >
                      <LuCircleCheckBig />
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <LoadingSpin />
          )}
          <Link href='/profile'>
            <PrimaryBtn btnText='Done' />
          </Link>

          {askDelete === false && (
            <button
              onClick={() => setAskDelete(true)}
              className={`flex justify-center items-center gap-2 bg-red-500 text-background font-bold rounded-4xl px-4 py-2 hover:bg-red-700 transition-all ease-in-out`}
            >
              <FaExclamationTriangle /> Delete Poll
            </button>
          )}
          {askDelete && (
            <div>
              <p className='text-center'>
                Are you sure you want to delete this poll? <br />
                This will permanently delete the poll and its data.
              </p>
              <div className='flex flex-row gap-2 pt-4'>
                <button
                  onClick={() => {
                    if (pollData?.id) deletePoll(pollData?.id);
                  }}
                  className={`flex justify-center items-center gap-2 bg-red-500 text-background font-bold rounded-4xl px-4 py-2 hover:bg-red-700 transition-all ease-in-out`}
                >
                  Yes, delete poll
                </button>
                <button
                  onClick={() => setAskDelete(false)}
                  className={`flex justify-center items-center gap-2 bg-text text-background font-bold rounded-4xl px-4 py-2 hover:bg-text-700 transition-all ease-in-out`}
                >
                  No, keep the poll
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </motion.div>
  );
}

export default EditPoll;
