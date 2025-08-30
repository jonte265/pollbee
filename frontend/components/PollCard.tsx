import Link from 'next/link';
import ActiveBadge from './ActiveBadge';
import { LuCopy, LuCheck, LuSquarePen } from 'react-icons/lu';
import { useState, useEffect } from 'react';

type pollCardType = {
  poll_title: string;
  is_active: boolean;
  share_id: string;
  created_at: string;
};

function PollCard({
  poll_title,
  is_active,
  share_id,
  created_at,
}: pollCardType) {
  const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(`${apiUrl}/poll/${share_id}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className='flex flex-col gap-2 justify-center items-center bg-gray-100 p-16 rounded-4xl'>
      <h2 className='text-2xl text-center font-bold'>{poll_title}</h2>

      <ActiveBadge isActive={is_active} />

      <p className='opacity-50 text-sm'>
        Created: {new Date(created_at).toLocaleDateString('sv-SE')}
      </p>
      <div className='flex flex-col justify-center items-center'>
        <Link href={`${apiUrl}/poll/${share_id}`}>
          <button className='mt-4 px-4 py-2 bg-text hover:bg-text-800 text-background rounded-4xl transition-all ease-in-out'>
            View Poll
          </button>
        </Link>
        <Link href={`${apiUrl}/edit/${share_id}`}>
          <button className='flex flex-row justify-center items-center gap-2 mt-4 px-4 py-2 border border-text  hover:bg-text hover:text-background rounded-4xl transition-all ease-in-out'>
            <LuSquarePen />
            Edit
          </button>
        </Link>
        <button
          onClick={handleCopyLink}
          className='flex justify-start items-center gap-2 mt-4 px-4 py-2 border border-text  hover:bg-text hover:text-background rounded-4xl transition-all ease-in-out'
        >
          {copied ? (
            <>
              <LuCheck />
              Copied
            </>
          ) : (
            <>
              <LuCopy />
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PollCard;
