import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "accent";

type PrimaryBtnType = {
  btnText: string | ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-background enabled:hover:bg-primary-800 enabled:active:bg-primary-900",
  secondary:
    "bg-text text-background enabled:hover:bg-background-900 enabled:active:bg-background-800",
  outline:
    "border border-text/50 bg-transparent text-text enabled:hover:border-transparent enabled:hover:bg-background-900 enabled:hover:text-background enabled:active:bg-background-800",
  accent:
    "bg-secondary text-text enabled:hover:bg-secondary-300 enabled:active:bg-secondary-200",
};

export default function Button({
  btnText,
  onClick,
  variant = "accent",
  fullWidth = true,
  type = "button",
  disabled = false,
}: PrimaryBtnType) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-10 items-center justify-center gap-1 rounded-4xl px-4 py-2 font-bold transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-50
      ${fullWidth ? "w-full" : "w-auto"} 
      ${variantStyles[variant]}`}
    >
      {btnText}
    </button>
  );
}
