import Link from 'next/link';

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className='flex flex-col gap-2 justify-center itemsce'>
      <h2 className='text-xl font-semibold'>{poll_title}</h2>
      <p className='text-xl'>{is_active ? 'Active' : 'Not active'}</p>
      <p>Created: {new Date(created_at).toLocaleString()}</p>
      <Link href={`${apiUrl}/${share_id}`}>
        <button className='px-4 py-2 bg-text text-background rounded-4xl'>
          View Poll
        </button>
      </Link>
    </div>
  );
}

export default PollCard;
