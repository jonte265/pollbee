"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";

type PageHeaderProps = {
  title: string;
  routePage: string;
};

export default function BackHeader({ title, routePage }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full gap-2">
      <motion.button
        onClick={() => router.push(`/${routePage}`)}
        className="rounded-4xl"
        whileHover={{ scale: 1.2 }}
        aria-label="Go back"
      >
        <MdArrowBackIosNew className="text-2xl" />
      </motion.button>

      <h2 className="text-2xl text-center font-bold">{title}</h2>

      <div className="w-6 h-6" />
    </div>
  );
}
