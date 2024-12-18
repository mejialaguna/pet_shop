import Image from 'next/image';
import { PetDetailsProps } from '@/interfaces/Pet';

export default function PetImage({ selectedPet }: PetDetailsProps) {
  return (
    <div className='flex items-center bg-white px-8 py-5 border-b border-light'>
      <Image
        src={selectedPet?.imageUrl ?? ''}
        alt={`selected pet`}
        width={75}
        height={75}
        className='w-[75px] h-[75px] rounded-full object-cover'
      />
      <h2 className='text-3xl font-semibold leading-7 ml-5'>
        {selectedPet?.name}
      </h2>
    </div>
  );
}
