'use server';

import { revalidatePath } from 'next/cache';

import { PetEssentials } from '@/interfaces/Pet';
import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { petFormSchema } from '@/lib/validations';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const createPet = async (newPetData: PetEssentials): Promise<CreatePetResponse> => {
  const { success, data } = petFormSchema.safeParse(newPetData);

  if (!success) {
    return {
      ok: false,
      message: 'Something went wrong, invalid pet data.',
    }
  }

  await sleep(1000);

  try {
    await prisma.pet.create({
      data: {
        ...data,
        // User: {
        //   ...user
        // },
      },
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
