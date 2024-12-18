import { PetDetailsProps } from '@/interfaces/Pet';

export default function PetNotes({ selectedPet }: PetDetailsProps) {
  return (
    <section className='bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light shadow-md'>
      <h3 className='text-xs font font-medium uppercase text-zinc-700'>
        Notes
      </h3>
      <p className='mt-1 text-lg text-zinc-800'>{selectedPet?.notes}</p>
    </section>
  );
}
