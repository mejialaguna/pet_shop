'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { usePetContent } from '@/hooks/usePetContent';
import { petFormSchema, TPetForm } from '@/lib/validations';
import { Pet } from '@/interfaces/Pet';
import { Button } from '@/components/ui/button';

type PetFormProps = {
  title?: string;
  onFormSubmission?: () => void;
  isNew?: boolean;
};

export default function PetForm({ title, onFormSubmission, isNew = true }: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContent();

  const {
    register,
    handleSubmit,
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

  const onSubmit = useCallback(async (data: TPetForm) => {
    const formData = new FormData();

    if (!Object.keys(errors).length && onFormSubmission) {
      onFormSubmission();
    }
  
    for (const [key, value] of Object.entries(data)) {
      formData.append(`${key}`, value.toString().trim());
    }

    const imageUrl =
      typeof data.imageUrl === 'string' && formData.get('imageUrl')
        ? (formData.get('imageUrl') as string).trim()
        : 'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg';

    const pet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl,
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };

    if (!isNew && selectedPet?.id) {
      handleEditPet(selectedPet?.id , pet);
    } else {
      handleAddPet(pet);
    }

  }, []);
  console.log('selectedPet', selectedPet);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...register('name', { required: true })} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input
            id='ownerName'
            {...register('ownerName', { required: true })}
          />
          {errors.ownerName && (
            <p className='text-red-500'>{errors.ownerName.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' {...register('imageUrl')}/>
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' {...register('age', { required: true })} />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' {...register('notes', { required: true })} />
          {errors.notes && (
            <p className='text-red-500'>{errors.notes.message}</p>
          )}
        </div>
      </div>

      <Button
        variant={'secondary'}
        type='submit'
        className='bg-zinc-200 hover:bg-zinc-300 mt-7'
      >
        {title}
      </Button>
    </form>
  );
}
