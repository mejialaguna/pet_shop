'use server';

import { revalidatePath } from 'next/cache';

import { PetEssentials } from '@/interfaces/Pet';
import prisma from '@/lib/prisma';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const editPet = async (id: string, newPetData: PetEssentials): Promise<CreatePetResponse> => {
  try { 
    await prisma.pet.update({
      where: { id },
      data: { ...newPetData },
    });

    revalidatePath('/app', 'layout');

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