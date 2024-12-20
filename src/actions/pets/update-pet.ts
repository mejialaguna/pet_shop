'use server';

import { revalidatePath } from 'next/cache';

import { PetEssentials } from '@/interfaces/Pet';
import prisma from '@/lib/prisma';
import { petFormSchema, petIdSchema, TPpetIdSchema } from '@/lib/validations';
import { sleep } from '@/lib/utils';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const editPet = async (id: TPpetIdSchema, newPetData: PetEssentials): Promise<CreatePetResponse> => {
  const { success, data } = petFormSchema.safeParse(newPetData);
  const { success: successId, data: dataId } = petIdSchema.safeParse(id);

  if (!success || !successId ) {
    return {
      ok: false,
      message: 'Something went wrong updating, invalid pet data.',
    };
  }

  await sleep(1000);

  try { 
    await prisma.pet.update({
      where: { id:  dataId },
      data: { ...data },
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