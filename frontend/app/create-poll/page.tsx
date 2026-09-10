"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpin from "@/components/LoadingSpin"
import { FaTrash } from "react-icons/fa"
import { MdArrowBackIosNew } from "react-icons/md"
import { motion } from "motion/react"
import { LuBot } from "react-icons/lu"
import BackHeader from "@/components/BackHeader"
import Button from "@/components/Button"
import Typography from "@/components/ui/typography/Typography"

export default function CreatePoll() {
  const router = useRouter()

  const [pollTitle, setPollTitle] = useState("")
  const [active, setActive] = useState(true)
  const [options, setOptions] = useState<string[]>([""])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [aiMsg, setAiMsg] = useState("")
  const [aiUsageLeft, setAiUsageLeft] = useState(0)

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    setOptions(updatedOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const newPoll = {
      polltitle: pollTitle,
      active: active,
      options: options.filter((opt) => opt.trim() !== ""), // remove empty options
    }

    try {
      const token = localStorage.getItem("token") // Get jwt token localstorage

      const res = await fetch(`${apiUrl}/polls/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPoll),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(`${data.message || "Error creating poll"} ❌`)
        return
      }

      setPollTitle("")
      setOptions([""])
      setMessage("Created new poll! 🐝")
      setTimeout(() => router.push("/profile"), 500)
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  const handleAiIdea = async () => {
    setLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const token = localStorage.getItem("token") // Get jwt token localstorage

      const res = await fetch(`${apiUrl}/polls/ai/poll-idea`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (!res.ok) {
        setAiMsg(data.message || "Something went wrong")
        return
      }

      if (!data) {
        setAiMsg(`Error, No data`)
        return console.log("Error, No data")
      }

      // console.log("ya", data);
      setAiMsg(data.message)
      setAiUsageLeft(3 - data.usages)
      setPollTitle(data.poll_ai.title)
      setOptions([
        data.poll_ai.option_1,
        data.poll_ai.option_2,
        data.poll_ai.option_3,
      ])
    } catch (error) {
      console.error(error)
      setAiMsg("Error, try again later")
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
      <main className="mx-auto flex max-w-xl flex-col items-center justify-center gap-8">
        <BackHeader title="Create a poll" routePage="profile" />

        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            onClick={handleAiIdea}
            variant="secondary"
            btnText={
              <>
                <LuBot />
                Get AI Poll Idea
              </>
            }
          />

          <Typography light small>
            (3 uses per day)
          </Typography>
          {aiMsg && <p className="text-sm">{aiMsg}</p>}
          {aiUsageLeft > 0 && (
            <p className="text-sm">Uses left: {aiUsageLeft}</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col justify-center gap-4"
        >
          <label>Poll title</label>
          <input
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            type="text"
            placeholder="Poll Title"
            className="rounded-4xl bg-background-100 p-2 pl-4"
          />

          <label>Options</label>
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                type="text"
                placeholder={`Option ${index + 1}`}
                className="flex-1 rounded-4xl bg-background-100 p-2 pl-4"
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="px-2 font-bold"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="self-start text-sm font-bold hover:underline"
          >
            + Add Option
          </button>

          <Button
            type="submit"
            disabled={loading}
            btnText={loading ? "Creating..." : "Create Poll"}
          />
        </form>

        {loading && <LoadingSpin />}
        {message && <p>{message}</p>}
      </main>
    </motion.div>
  )
}
