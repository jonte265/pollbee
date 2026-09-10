import Link from "next/link"
import ActiveBadge from "./ActiveBadge"
import Button from "./Button"
import { LuCopy, LuLink2, LuCheck, LuSquarePen } from "react-icons/lu"
import { useState } from "react"
import H2 from "./ui/typography/H2"
import Typography from "./ui/typography/Typography"

type pollCardType = {
  poll_title: string
  is_active: boolean
  share_id: string
  created_at: string
}

export default function PollCard({
  poll_title,
  is_active,
  share_id,
  created_at,
}: pollCardType) {
  const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL

  const [copied, setCopied] = useState(false)

  function handleCopyLink() {
    navigator.clipboard.writeText(`${apiUrl}/poll/${share_id}`)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-between gap-8 rounded-4xl bg-background-50 p-16">
      <div className="flex items-center justify-center">
        <ActiveBadge isActive={is_active} />
      </div>

      <div className="text-center">
        <H2>{poll_title}</H2>
        <Typography light>
          Created: {new Date(created_at).toLocaleDateString("sv-SE")}
        </Typography>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-full">
            <Button
              variant="outline"
              btnText={
                copied ? (
                  <>
                    <LuCheck /> Copied
                  </>
                ) : (
                  <>
                    <LuLink2 /> Copy
                  </>
                )
              }
              onClick={handleCopyLink}
            />
          </div>
          <Link href={`${apiUrl}/edit/${share_id}`} className="w-full">
            <Button
              variant="outline"
              btnText={
                <>
                  <LuSquarePen /> Edit
                </>
              }
            />
          </Link>
        </div>
        <Link href={`${apiUrl}/poll/${share_id}`}>
          <Button btnText="View Poll" />
        </Link>
      </div>
    </div>
  )
}
