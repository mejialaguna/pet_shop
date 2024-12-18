
import { PetDetailsProps } from '@/interfaces/Pet';
import { PetImage, PetNotes, PetOwner } from './';

export default function PetDetails({ selectedPet }: PetDetailsProps) {
  if (!selectedPet) return <></>;

  return (
    <section className='flex flex-col h-full w-full'>
      <PetImage selectedPet={selectedPet} />
      <PetOwner selectedPet={selectedPet} />
      <PetNotes selectedPet={selectedPet} />
    </section>
  );
}
