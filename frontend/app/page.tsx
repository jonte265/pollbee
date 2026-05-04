"use client";

import Link from "next/link";
import FeatureSection from "@/components/FeatureSection";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LuCircleUserRound, LuArrowRight } from "react-icons/lu";
import Button from "@/components/Button";
import H2 from "@/components/ui/typography/H2";
import Typography from "@/components/ui/typography/Typography";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

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
        <main className="flex flex-col gap-16 text-center max-w-6xl m-auto">
          <div className="flex flex-col gap-8 py-16">
            <div className="flex flex-col gap-2 text-center">
              <H2>Create and share live polls easily</H2>
              <Typography>
                Build your profile to manage all your polls in one place
              </Typography>
            </div>
            <div className="flex justify-center items-center">
              {signedIn ? (
                <Link href="/profile">
                  <Button
                    btnText={
                      <>
                        <LuCircleUserRound /> Profile
                      </>
                    }
                  />
                </Link>
              ) : (
                <Link href="/signup">
                  <Button
                    btnText={
                      <>
                        Sign Up <LuArrowRight />
                      </>
                    }
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeatureSection
                sectionTitle={"Create Polls Instantly with AI Assistance 📊"}
                li1={"Set up a poll in seconds with a simple interface"}
                li2="Add unlimited options and control vote settings"
                li3="Generate poll ideas automatically with AI"
                img="create-poll-page.png"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeatureSection
                sectionTitle="Share Seamlessly 🔁"
                li1="Generate a shareable link and share with anyone"
                li2="No login required for voters"
                li3="Real-time updates as votes come in"
                img="vote-poll-page.png"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeatureSection
                sectionTitle="Track Results Live 📈"
                li1="See live vote counts"
                li2="Get insights on poll engagement"
                li3="More built-in analytics coming soon"
                img="poll-analytics-page.png"
              />
            </motion.div>
          </div>
        </main>
      </motion.div>
    </>
  );
}
