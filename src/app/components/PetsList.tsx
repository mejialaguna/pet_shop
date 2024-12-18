import { Button } from '@/components/ui/button';
import { Pet } from '@/interfaces/Pet';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PetListProps {
  petsData: Pet[];
  handleChangeSelectedPetId: (id: Pet['id']) => void;
  selectedPetId: Pet['id'] | null;
}

export default function PetsList({
  petsData,
  handleChangeSelectedPetId,
  selectedPetId,
}: PetListProps) {
  return (
    <ul className='bg-white border-b border-black/[0.08]'>
      {petsData.map((pet) => (
        <li key={pet?.id}>
          <Button
            className={cn(
              'w-full h-[80px] flex items-center justify-start px-5 text-base gap-3 hover:bg-[#EFF1F2] transition-all',
              {
                'bg-[#EFF1F2]': pet?.id === selectedPetId,
              }
            )}
            variant={'ghost'}
            onClick={() => handleChangeSelectedPetId(pet.id)}
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
