'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePetContent } from '@/hooks/usePetContent';
import { Pet } from '@/interfaces/Pet';
import { petFormSchema, TPetForm } from '@/lib/validations';

import PetFormBtn from './pet-form-btn';

type PetFormProps = {
  title?: string;
  onFormSubmission?: () => void;
  isNew?: boolean;
};

type PetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export default function PetForm({
  title,
  onFormSubmission,
  isNew = true,
}: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContent();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      selectedPet && !isNew
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  const handleAction = useCallback(async () => {
     const result = await trigger();
     if (!result) return;

     onFormSubmission?.();

    const petData = getValues();
    const sanitizedPetData: PetEssentials = {
      ...petData,
      imageUrl:
        petData?.imageUrl && typeof petData?.imageUrl === 'string'
          ? petData?.imageUrl
          : 'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg',
      age: +petData?.age,
    };

     const action = isNew
       ? () => handleAddPet(sanitizedPetData)
       : () => selectedPet?.id && handleEditPet(selectedPet.id, sanitizedPetData);

     await action();
  }, []);

  return (
    <form action={handleAction} className='flex flex-col'>
      <div className='space-y-3 text-lg'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...register('name', { required: true })} required />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input
            id='ownerName'
            {...register('ownerName', { required: true })}
            required
          />
          {errors.ownerName && (
            <p className='text-red-500'>{errors.ownerName.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' {...register('age', { required: true })} required />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            {...register('notes', { required: true })}
            required
          />
          {errors.notes && (
            <p className='text-red-500'>{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn title={title} isNew={isNew} />
    </form>
  );
}
