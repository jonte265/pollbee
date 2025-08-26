'use client';

import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpin from '@/components/LoadingSpin';
import { FaCheck, FaTimes } from 'react-icons/fa';

type EditPollParams = Promise<{
  pollId: string;
}>;

function EditPoll({ params }: { params: EditPollParams }) {
  const router = useRouter();

  const { pollId } = use(params);

  console.log(pollId);

  return (
    <main className='flex flex-col gap-8 items-center justify-center'>
      <h1>edit</h1>
    </main>
  );
}

export default EditPoll;
