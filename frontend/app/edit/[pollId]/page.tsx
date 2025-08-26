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
  poll_options: PollOptionType[];
};

type PollOptionType = {
  option_text: string;
  id: number;
};

function EditPoll({ params }: { params: EditPollParams }) {
  const [pollData, setPollData] = useState<PollDataType | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { pollId } = use(params);

  const [editMode, setEditMode] = useState(-10);

  function enableEditMode(id: number) {
    setEditMode(id);
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
              <p>Edit mode on</p>
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
                <p key={opt.id}>Edit mode on</p>
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
