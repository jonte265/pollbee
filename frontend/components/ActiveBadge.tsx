import { LuCirclePause } from "react-icons/lu";
import Typography from "./ui/typography/Typography";

type activeBadgeTypes = {
  isActive: boolean;
};

export default function ActiveBadge({ isActive }: activeBadgeTypes) {
  return (
    <>
      {isActive ? (
        <div
          className={`py-1 px-2 rounded-4xl flex justify-center items-center gap-1 bg-background-200 `}
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <Typography small bold>
            Active
          </Typography>
        </div>
      ) : (
        <div
          className={`py-1 px-2 rounded-4xl flex justify-center items-center gap-1 bg-background-200 `}
        >
          <LuCirclePause className="text-text" size={14} />
          <Typography bold small light>
            Inactive
          </Typography>
        </div>
      )}
    </>
  );
}
