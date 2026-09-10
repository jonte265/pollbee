import { LuCirclePause } from "react-icons/lu"
import Typography from "./ui/typography/Typography"

type activeBadgeTypes = {
  isActive: boolean
}

export default function ActiveBadge({ isActive }: activeBadgeTypes) {
  return (
    <>
      {isActive ? (
        <div
          className={`flex items-center justify-center gap-1 rounded-4xl bg-background-50 px-2 py-1`}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-text" />
          <Typography small bold>
            Active
          </Typography>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center gap-1 rounded-4xl bg-background-50 px-2 py-1`}
        >
          <LuCirclePause className="text-text" size={14} />
          <Typography bold small light>
            Inactive
          </Typography>
        </div>
      )}
    </>
  )
}
