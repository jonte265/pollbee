'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';
import { FaTrash } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'motion/react';
import { LuBot } from 'react-icons/lu';

function CreatePoll() {
  const router = useRouter();

  const [pollTitle, setPollTitle] = useState('');
  const [active, setActive] = useState(true);
  const [options, setOptions] = useState<string[]>(['']);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiMsg, setAiMsg] = useState('');
  const [aiUsageLeft, setAiUsageLeft] = useState(0);

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

      const res = await fetch(`${apiUrl}/polls/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoll),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`${data.message || 'Error creating poll'} ❌`);
        return;
      }

      setPollTitle('');
      setOptions(['']);
      setMessage('Created new poll! 🐝');
      setTimeout(() => router.push('/profile'), 500);
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong ❌');
    } finally {
      setLoading(false);
    }
  };

  const handleAiIdea = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const token = localStorage.getItem('token'); // Get jwt token localstorage

      const res = await fetch(`${apiUrl}/polls/ai/poll-idea`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        setAiMsg(`Max AI usage reached for today`);
        return console.log(data.message);
      }

      if (!data) {
        setAiMsg(`Error, No data`);
        return console.log('Error, No data');
      }

      // console.log('ya', data);
      setAiMsg(data.message);
      setAiUsageLeft(3 - data.usages);
      setPollTitle(data.poll_ai.title);
      setOptions([
        data.poll_ai.option_1,
        data.poll_ai.option_2,
        data.poll_ai.option_3,
      ]);
    } catch (error) {
      console.error(error);
      setAiMsg('Error, try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className='flex flex-col gap-8 items-center justify-center max-w-sm mx-auto p-4'>
        <motion.button
          onClick={() => router.push('/profile')}
          className='hover:bg-primary-50 p-4 rounded-4xl text-start self-start'
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          aria-label='Go to profile'
        >
          <FaArrowLeft />
        </motion.button>
        <h2 className='text-xl text-center font-bold'>Create a poll</h2>

        <div className='flex flex-col justify-center items-center gap-2'>
          <button
            onClick={handleAiIdea}
            className='flex justify-center items-center gap-1 bg-secondary text-background font-bold rounded-4xl px-4 py-2 hover:bg-secondary-300 transition-all ease-in-out'
          >
            <LuBot />
            Get AI Poll Idea
          </button>
          <p className='text-sm'>(3 uses per day)</p>
          {aiMsg && <p className='text-sm'>{aiMsg}</p>}
          {aiUsageLeft > 0 && (
            <p className='text-sm'>Uses left: {aiUsageLeft}</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-4 max-w-sm w-full'
        >
          <input
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            type='text'
            placeholder='Poll Title'
            className='rounded-4xl p-2 pl-4 bg-primary-50'
          />

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
                  className=' font-bold px-2'
                >
                  <FaTrash />
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
              Create Poll
            </button>
          ) : (
            <button
              disabled
              className='bg-primary-100 text-background font-bold rounded-4xl px-4 py-2 transition-all ease-in-out'
            >
              Creating...
            </button>
          )}
        </form>

        {loading && <LoadingSpin />}
        {message && <p>{message}</p>}
      </main>
    </motion.div>
  );
}

export default CreatePoll;
