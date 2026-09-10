"use client"

import Button from "@/components/Button"
import LoadingSpin from "@/components/LoadingSpin"
import PollCard from "@/components/PollCard"
import PollChart from "@/components/PollChart"
import Divider from "@/components/ui/Divider"
import H2 from "@/components/ui/typography/H2"
import Typography from "@/components/ui/typography/Typography"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaExclamationTriangle } from "react-icons/fa"
import { LuPlus } from "react-icons/lu"

type profileDataType = {
  poll_title: string
  is_active: boolean
  share_id: string
  created_at: string
  total_votes: number
  poll_options: {
    vote_count: number
  }[]
}

export default function ProfilePage() {
  // Redirect if not logged in
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [userNameLocal, setUserNameLocal] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null) // Get jwt token localstorage

  const [askDelete, setAskDelete] = useState(false)

  useEffect(() => {
    const username = localStorage.getItem("username")
    const tok = localStorage.getItem("token")

    setUserNameLocal(username)
    setToken(tok)

    if (!tok) {
      router.push("/login")
    }
  }, [])

  async function deleteAccount(userDelete: string) {
    console.log(userDelete)

    const res = await fetch(`${apiUrl}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userDelete,
      }),
    })

    if (!res.ok) {
      console.log("Error, not ok fail delete account")
    }

    const data = await res.json()
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    // router.push('/');
    window.location.href = "/" // Refresh window
  }

  const [profileData, setProfileData] = useState<profileDataType[]>([])

  const [loading, setLoading] = useState(false)

  async function fetchProfileData() {
    setLoading(true)

    const res = await fetch(`${apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      console.log("Error, not ok")
    }

    const data = await res.json()
    console.log(data)
    setProfileData(data)
    setLoading(false)
  }

  useEffect(() => {
    if (token) {
      fetchProfileData()
    }
  }, [token])

  console.log("profile data", profileData)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className="m-auto flex max-w-6xl flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <H2>Welcome {userNameLocal}!</H2>
            <Typography light>Your polls</Typography>
          </div>
          <Link href="/create-poll">
            <Button
              fullWidth={false}
              btnText={
                <>
                  Create Poll <LuPlus />
                </>
              }
            />
          </Link>
        </div>

        <div className="flex w-full flex-row-reverse items-center justify-between gap-2">
          <Typography light>
            {profileData.length > 0 ? `(${profileData.length}) ` : "(0) "}
            {profileData.length === 1 ? "poll" : "polls"}
          </Typography>
        </div>

        {loading ? (
          <LoadingSpin />
        ) : profileData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profileData.map((poll, index) => (
              <PollCard
                key={index}
                poll_title={poll.poll_title}
                is_active={poll.is_active}
                share_id={poll.share_id}
                created_at={poll.created_at}
              />
            ))}
          </div>
        ) : (
          <Typography textCenter light>
            You haven’t created any polls yet
          </Typography>
        )}

        {/* Graph */}
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {profileData.length > 0 && (
            <>
              <H2 textCenter>Total votes per poll</H2>
              <PollChart data={profileData} />
            </>
          )}
        </div>

        <div className="w-full">
          <Divider />
        </div>

        {/* Delete area */}
        <div className="">
          {userNameLocal && askDelete === false && (
            <button
              onClick={() => setAskDelete(true)}
              className={`flex items-center justify-center gap-2 rounded-4xl bg-red-600 px-4 py-2 font-bold text-background transition-all ease-in-out hover:bg-red-700`}
            >
              <FaExclamationTriangle /> Delete Account
            </button>
          )}
          {askDelete && (
            <div>
              <p className="text-center">
                Are you sure you want to delete your account? <br />
                This will permanently delete all your data
              </p>
              <div className="flex flex-row gap-2 pt-4">
                <button
                  onClick={() => {
                    if (userNameLocal) deleteAccount(userNameLocal)
                  }}
                  className={`flex items-center justify-center gap-2 rounded-4xl bg-red-500 px-4 py-2 font-bold text-background transition-all ease-in-out hover:bg-red-700`}
                >
                  Yes, delete account.
                </button>
                <button
                  onClick={() => setAskDelete(false)}
                  className={`flex items-center justify-center gap-2 rounded-4xl bg-text px-4 py-2 font-bold text-background transition-all ease-in-out hover:bg-text-700`}
                >
                  No, keep my account.
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </motion.div>
  )
}
