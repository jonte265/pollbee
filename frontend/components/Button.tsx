import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "accent";

type PrimaryBtnType = {
  btnText: string | ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-background hover:bg-primary-700 active:bg-primary-800",
  secondary: "bg-text text-background hover:bg-text-800 active:bg-text-900",
  outline:
    "bg-transparent text-text border border-text/50 hover:bg-text hover:text-background hover:border-transparent",
  accent:
    "bg-secondary text-text hover:bg-secondary-300 active:bg-secondary-400",
};

export default function Button({
  btnText,
  onClick,
  variant = "primary",
  fullWidth = true,
}: PrimaryBtnType) {
  return (
    <button
      onClick={onClick}
      className={`font-bold flex justify-center items-center gap-1 rounded-4xl px-4 py-2 min-h-10 transition-all ease-in-out 
      ${fullWidth ? "w-full" : "w-auto"} 
      ${variantStyles[variant]}`}
    >
      {btnText}
    </button>
  );
}
