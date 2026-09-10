"use client"

import Link from "next/link"
import FeatureSection from "@/components/FeatureSection"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { LuCircleUserRound, LuArrowRight } from "react-icons/lu"
import Button from "@/components/Button"
import H2 from "@/components/ui/typography/H2"
import Typography from "@/components/ui/typography/Typography"
import { HeroEmoji } from "@/components/HeroEmoji"

export default function Home() {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token")

    if (tokenLocal) {
      setSignedIn(true)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className="m-auto flex max-w-6xl flex-col gap-16 text-center">
        <section className="flex min-h-[50vh] flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-2 text-center">
            <HeroEmoji />
            <H2 large>Create and share live polls easily</H2>
            <Typography>
              Build your profile to manage all your polls in one place
            </Typography>
          </div>
          {/* Cta Buttons */}
          <div className="flex items-center justify-center">
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
              <div className="flex flex-row gap-2">
                <Link href="/poll/iI89geUz">
                  <Button variant="outline" btnText={<>Try sample poll</>} />
                </Link>
                <Link href="/signup">
                  <Button
                    btnText={
                      <>
                        Sign up <LuArrowRight />
                      </>
                    }
                  />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Feature cards */}
        <section className="flex flex-col gap-8">
          <FeatureSection
            sectionTitle={"Create Polls Instantly with AI Assistance 📊"}
            li1={"Set up a poll in seconds with a simple interface"}
            li2="Add unlimited options and control vote settings"
            li3="Generate poll ideas automatically with AI"
            img="create-poll-page.png"
          />

          <FeatureSection
            sectionTitle="Share Seamlessly 🔁"
            li1="Generate a shareable link and share with anyone"
            li2="No login required for voters"
            li3="Real-time updates as votes come in"
            img="vote-poll-page.png"
          />

          <FeatureSection
            sectionTitle="Track Results Live 📈"
            li1="See live vote counts"
            li2="Get insights on poll engagement"
            li3="More built-in analytics coming soon"
            img="poll-analytics-page.png"
          />
        </section>
      </main>
    </motion.div>
  )
}
