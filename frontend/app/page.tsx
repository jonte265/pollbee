'use client';

import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';
import FeatureSection from '@/components/FeatureSection';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LuCircleUserRound } from 'react-icons/lu';

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');

    if (tokenLocal) {
      setSignedIn(true);
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className='flex flex-col justify-center items-center gap-4 max-w-xl mx-auto p-6 text-center'>
          <h1 className='text-4xl font-extrabold mb-4'>PollBee 🐝</h1>
          <p className='text-lg text-gray-700'>
            Create and share live polls easily. Build your profile to manage all
            your polls in one place.
          </p>
          <div className='flex gap-4 mb-6'>
            {signedIn ? (
              <Link href='/profile'>
                <button className='flex flex-row justify-center items-center gap-1 px-6 py-2 border border-primary text-primary rounded-3xl font-semibold hover:bg-primary hover:text-background transition'>
                  <LuCircleUserRound />
                  Profile
                </button>
              </Link>
            ) : (
              <Link href='/signup'>
                <button className='px-6 py-2 border border-primary text-primary rounded-3xl font-semibold hover:bg-primary hover:text-background transition'>
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </main>
        <div className='flex flex-col gap-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeatureSection
              sectionTitle={'Create Polls Instantly with AI Assistance 📊'}
              li1={'Set up a poll in seconds with a simple interface'}
              li2='Add unlimited options and control vote settings'
              li3='Generate poll ideas automatically with AI'
              img='create-poll-homescreen.png'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeatureSection
              sectionTitle='Share Seamlessly 🔁'
              li1='Generate a shareable link and share with anyone'
              li2='No login required for voters'
              li3='Real-time updates as votes come in'
              img='img2.png'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeatureSection
              sectionTitle='Track Results Live 📈'
              li1='See live vote counts'
              li2='Get insights on poll engagement'
              li3='Built-in analytics coming soon'
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
