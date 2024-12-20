'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const editPet = async (id: string, newPetData): Promise<CreatePetResponse> => {
  console.log('newPetData', newPetData);
  try { 
    await prisma.pet.update({
      where: { id },
      data: { ...newPetData },
    });

    revalidatePath('/app', 'layout');
    console.log('revalidating Path');
    return {
      ok: true,
      message: `${newPetData?.name}, has been updated`,
    };

  } catch (error) {
    return {
      ok: false,
      message: `something went wrong creating pets, ${error}`,
    };
  }
};