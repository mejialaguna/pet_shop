'use client';

import Image from 'next/image';

import { usePetContent } from '@/hooks/usePetContent';

import { PetImage, PetNotes, PetOwner } from './';

export default function PetDetails() {
  const { selectedPet } = usePetContent();

  if (!selectedPet)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Image
          className='w-[300px] h-[300] flex items-center justify-center'
          src={
            'https://res.cloudinary.com/jlml/image/upload/v1734768718/pet-store/cojcxmkycsbyyzgwyqo7.png'
          }
          alt={'placeholder'}
          height={300}
          width={300}
          sizes='200'
        />
      </div>
    );

  return (
    <section className='flex flex-col h-full w-full'>
      <PetImage selectedPet={selectedPet} />
      <PetOwner selectedPet={selectedPet} />
      <PetNotes selectedPet={selectedPet} />
    </section>
  );
}
