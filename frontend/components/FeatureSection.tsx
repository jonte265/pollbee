import Image from "next/image";
import H2 from "./ui/typography/H2";

type FeatureSectionTypes = {
  sectionTitle: string;
  li1: string;
  li2: string;
  li3: string;
  img?: string;
};

function FeatureSection({
  sectionTitle,
  li1,
  li2,
  li3,
  img,
}: FeatureSectionTypes) {
  return (
    <section className="flex flex-col justify-center items-center gap-8 p-8 sm:p-16 rounded-4xl bg-text/5">
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
    </section>
  );
}

export default FeatureSection;
