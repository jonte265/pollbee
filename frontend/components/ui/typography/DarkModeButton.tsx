import { LuSun, LuMoonStar } from "react-icons/lu";

type DarkModeButtonType = {
  darkMode: boolean;
  onClick?: () => void;
};

export default function DarkModeButton({
  darkMode = false,
  onClick,
}: DarkModeButtonType) {
  return (
    <button className="text-2xl" onClick={onClick}>
      {darkMode ? <LuSun /> : <LuMoonStar />}
    </button>
  );
}
