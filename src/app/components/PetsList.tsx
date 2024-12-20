'use client';

import Image from 'next/image';
import { useMemo, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { usePetContent } from '@/hooks/usePetContent';
import { useSearchContext } from '@/hooks/useSearchContext';
import { cn } from '@/lib/utils';

export default function PetsList() {
  const {
    optimisticPets: petsData,
    selectedPetId,
    handleChangeSelectedPetId,
  } = usePetContent();
  const { searchQuery, setSearchQuery } = useSearchContext();
  const filteredPets = useMemo(() => {
    if (!searchQuery) return petsData;
    return petsData?.filter((pet) =>
      pet?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [petsData, searchQuery]);

  const handleSelecttion = useCallback((id:string) => {
    handleChangeSelectedPetId(id);
    setSearchQuery('');
  }, [handleChangeSelectedPetId]);

  return (
    <ul className='bg-white shadow-sm'>
      {filteredPets?.map((pet, index) => (
        <li key={pet?.id}>
          <Button
            className={cn(
              'w-full h-[80px] flex items-center justify-start px-5 text-base gap-3 hover:bg-[#EFF1F2] transition-all',
              {
                'bg-[#EFF1F2]': pet?.id === selectedPetId,
                'border-b border-light': index !== petsData.length - 1,
              }
            )}
            variant={'ghost'}
            onClick={() => handleSelecttion(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt={`${pet.name} image`}
              width={44}
              height={44}
              className='w-11 h-11 rounded-full object-cover'
            />
            <span className='font-semibold'>{pet.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
