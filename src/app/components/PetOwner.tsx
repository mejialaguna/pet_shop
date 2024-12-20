import { PetDetailsProps } from '@/interfaces/Pet';

export default function PetOwner({ selectedPet }: PetDetailsProps) {
  return (
    <div className='flex justify-around my-10 text-center'>
      <div>
        <h3 className='text-xs font font-medium uppercase text-zinc-700'>
          Owner Name
        </h3>
        <p className='mt-1 text-lg text-zinc-800'>{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className='text-xs font font-medium uppercase text-zinc-700'>
          age
        </h3>
        <p className='mt-1 text-lg text-zinc-800'>{selectedPet?.age}</p>
      </div>
    </div>
  );
}