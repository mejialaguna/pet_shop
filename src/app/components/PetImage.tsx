import Image from 'next/image';
import { PetDetailsProps } from '@/interfaces/Pet';
import { usePetContent } from '@/hooks/usePetContent';
import { Button } from '@/components/ui/button';
import Modal from './modal';
import PetForm from './PetForm';
import { deletePet } from '@/actions/pets/delete-pet';
import { useCallback, useTransition } from 'react';
import { toast } from '@/components/ui/use-toast';

export default function PetImage({ selectedPet }: PetDetailsProps) {
  const { handleCheckoutPet } = usePetContent();
  const handleCheckout = useCallback(async(id:string) => {
    const {ok, message} = await deletePet(id);
    toast({
      description: message,
      className: ok ? 'bg-green-500 text-white text-lg' : '',
      variant: ok ? 'default' : 'destructive',
    });
  }, []);

  return (
    <div className='flex items-center bg-white px-8 py-5 border-b border-light justify-between'>
      <div className='flex items-center'>
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

      <div className='space-x-3'>
        <Modal title='Edit pet'>
          <Button
            variant={'secondary'}
            className='transition-all bg-zinc-200 hover:bg-zinc-300 rounded-full'
          >
            Edit
          </Button>
          <PetForm title='Edit pet' isNew={false} />
        </Modal>

        <Button
          variant={'secondary'}
          className='transition-all bg-zinc-200 hover:bg-zinc-300 rounded-full'
          onClick={() => selectedPet?.id && handleCheckout(selectedPet.id)}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
