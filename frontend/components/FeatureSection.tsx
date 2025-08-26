import Image from 'next/image';

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
    <section className='flex justify-center items-center py-32 px-8 rounded-4xl bg-gray-100'>
      <div className='flex flex-col justify-center text-center items-center gap-8'>
        <h2 className='text-4xl font-semibold'>{sectionTitle}</h2>
        <ul className='flex flex-col justify-center items-center'>
          {li1 && <li>{li1}</li>}
          {li2 && <li>{li2}</li>}
          {li3 && <li>{li3}</li>}
        </ul>
        {img && (
          <Image
            className='rounded-4xl'
            src={`/${img}`}
            width={500}
            height={500}
            alt='Poll'
          />
        )}
      </div>
    </section>
  );
}

export default FeatureSection;
