'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const editPet = async (id: string, formData: FormData): Promise<CreatePetResponse> => {
  try {
    const pet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };
    
    await prisma.pet.update({
      where: { id },
      data: { ...pet },
    });

    revalidatePath('/app', 'layout');

    return {
      ok: true,
      message: `${pet?.name}, has been updated`,
    };

  } catch (error) {
    return {
      ok: false,
      message: `something went wrong creating pets, ${error}`,
    };
  }
};