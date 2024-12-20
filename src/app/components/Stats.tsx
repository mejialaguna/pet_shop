'use client';

import { usePetContent } from '@/hooks/usePetContent';

export default function Stats() {
  const { optimisticPets: petsData } = usePetContent();
  return (
    <section className='text-center'>
      <p className='font-bold text-2xl leading-6'>{petsData?.length}</p>
      <p className='text-sm'>Current guest</p>
    </section>
  );
}
