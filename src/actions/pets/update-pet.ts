'use server';

import { revalidatePath } from 'next/cache';

import { PetEssentials } from '@/interfaces/Pet';
import { isLoggedIn } from '@/lib/actionsUtils';
import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { petFormSchema, petIdSchema, TPpetIdSchema } from '@/lib/validations';

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const editPet = async (
  id: TPpetIdSchema,
  newPetData: PetEssentials
): Promise<CreatePetResponse> => {
  // check for user session
  const session = await isLoggedIn();
  const { success, data } = petFormSchema.safeParse(newPetData);
  const { success: successId, data: petId } = petIdSchema.safeParse(id);

  if (!success || !successId) {
    return {
      ok: false,
      message: 'Something went wrong updating, invalid pet data.',
    };
  }

  await sleep(1000);

  try {
    // Retrieve the pet and verify ownership
    const petOwnerId = session?.user?.id as string;

    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      select: { name: true, userId: true },
    });

    if (!pet) {
      return {
        ok: false,
        message: 'Pet not found.',
      };
    }

    if (pet.userId !== petOwnerId) {
      return {
        ok: false,
        message: 'You do not have permission to delete this pet.',
      };
    }

    // Proceed with deletion

    await prisma.pet.update({
      where: { id: petId },
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
