"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingSpin from "@/components/LoadingSpin"
import { motion } from "motion/react"
import H2 from "@/components/ui/typography/H2"
import Typography from "@/components/ui/typography/Typography"
import Button from "@/components/Button"

function SignupPage() {
  const router = useRouter()

  // Redirect to profile if logged in
  useEffect(() => {
    const tokenLocal = localStorage.getItem("token")

    if (tokenLocal !== null) {
      router.push("/profile")
    } else {
    }
  }, [])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const newUser = {
      username: username,
      password: password,
    }

    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      const data = await res.json()

      if (!res.ok) {
        console.log("Respond not ok, problem")
        setMessage(`${data.message} ❌`)
        return
      }

      setUsername("")
      setPassword("")
      setMessage("Registration successful, welcome aboard")
      setTimeout(() => router.push("/login"), 500)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex flex-col items-center justify-center gap-8">
        <H2>Create your free account</H2>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col justify-center gap-4"
        >
          <Typography>Username</Typography>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="rounded-4xl bg-background-50 p-2 pl-4"
          />
          <Typography>Password</Typography>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="rounded-4xl bg-background-50 p-2 pl-4"
          />
          <Button type="submit" disabled={loading} btnText="Sign up" />
        </form>
        {loading && <LoadingSpin />}

        {message && <p>{message}</p>}
      </main>
    </motion.div>
  )
}

export default SignupPage
