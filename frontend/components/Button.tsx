import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type PrimaryBtnType = {
  btnText: string | ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-background hover:bg-primary-700",
  secondary: "bg-text text-background hover:bg-text-800",
  outline: "border border-text text-text hover:bg-text hover:text-background",
};

export default function Button({
  btnText,
  onClick,
  variant = "primary",
}: PrimaryBtnType) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-1 rounded-4xl px-4 py-2 w-full transition-all ease-in-out ${variantStyles[variant]}`}
    >
      {btnText}
    </button>
  );
}
