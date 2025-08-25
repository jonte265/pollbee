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
    <div className='flex flex-col gap-2 justify-center items-center bg-text-50 p-16 rounded-4xl'>
      <h2 className='text-2xl pb-4 font-bold'>{poll_title}</h2>
      <p
        className={`py-1 px-2 rounded-4xl text-sm ${
          is_active ? 'bg-green-200' : 'bg-red-200'
        }`}
      >
        {is_active ? 'Active' : 'Inactive'}
      </p>

      <p className='opacity-50 text-sm'>
        Created: {new Date(created_at).toLocaleDateString('sv-SE')}
      </p>
      <Link href={`${apiUrl}/${share_id}`}>
        <button className='mt-4 px-4 py-2 bg-text hover:bg-text-800 text-background rounded-4xl'>
          View Poll
        </button>
      </Link>
    </div>
  );
}

export default PollCard;
