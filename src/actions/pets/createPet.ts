'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const createPet = async (newPetData): Promise<CreatePetResponse> => {
  try {
    await sleep(1000);

    await prisma.pet.create({
      data: { ...newPetData },
    });

    // ('we can revalidate what we need either way using url path or the folder structure where the action is located');
    // revalidatePath('/app/dashboard');
    revalidatePath('/app', 'layout');

    return {
      ok: true,
      message: `${newPetData?.name}, is now a part of the family`,
    };
  } catch (error) {
    return {
      ok: false,
      message: `something went wrong creating pets, ${error}`,
    };
  }
};
