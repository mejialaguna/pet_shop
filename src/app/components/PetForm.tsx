'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useToast } from '@/components/ui/use-toast';
import { MinusCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { usePetContent } from '@/hooks/usePetContent';
import { petFormSchema, TPetForm } from '@/lib/validations';
import { createPet } from '@/actions/pets/createPet';
import PetFormBtn from './pet-form-btn';
import { editPet } from '@/actions/pets/update-pet';
import { useCallback } from 'react';

type PetFormProps = {
  title?: string;
  onFormSubmission?: () => void;
  isNew?: boolean;
};
interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export default function PetForm({
  title,
  onFormSubmission,
  isNew = true,
}: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContent();
  const { toast } = useToast();
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

  const handleAction = useCallback(async (formData: FormData) => {
     const result = await trigger();
     if (!result) return;

     onFormSubmission?.();

     const petData = getValues();
     petData.imageUrl ||
       'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg';

     const action = isNew
       ? () => createPet(formData)
       : () => selectedPet?.id && editPet(selectedPet.id, formData);

     const { ok, message } = (await action()) as CreatePetResponse;

     if (!ok) {
       toast({
         description: message,
         variant: 'destructive',
         action: <MinusCircledIcon />,
       });
       return;
     }

     toast({
       description: message,
       className: ok ? 'bg-green-500 text-white text-lg' : '',
       variant: ok ? 'default' : 'destructive',
       action: ok ? <CheckCircledIcon /> : <MinusCircledIcon />,
     });
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
