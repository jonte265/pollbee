import Image from "next/image";
import H2 from "./ui/typography/H2";
import { motion } from "motion/react";

type FeatureSectionTypes = {
  sectionTitle: string;
  li1: string;
  li2: string;
  li3: string;
  img?: string;
};

export default function FeatureSection({
  sectionTitle,
  li1,
  li2,
  li3,
  img,
}: FeatureSectionTypes) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center gap-8 p-12 sm:p-16 rounded-4xl bg-background-100"
    >
      <div className="flex flex-col gap-4">
        <H2>{sectionTitle}</H2>
        <ul className="flex flex-col justify-center items-center">
          {li1 && <li>{li1}</li>}
          {li2 && <li>{li2}</li>}
          {li3 && <li>{li3}</li>}
        </ul>
      </div>
      {img && (
        <Image
          className="rounded-4xl"
          src={`/${img}`}
          width={600}
          height={600}
          alt="Poll"
        />
      )}
    </motion.section>
  );
}
