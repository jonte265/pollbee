import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const pollEmojis = ["🎮", "🎬", "🍕", "⚽", "🎵", "☕", "📚", "✈️"];

export function HeroEmoji() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * pollEmojis.length));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto h-20 w-20">
      <AnimatePresence mode="wait">
        <motion.span
          key={pollEmojis[index]}
          className="absolute inset-0 flex items-center justify-center text-4xl"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {pollEmojis[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
