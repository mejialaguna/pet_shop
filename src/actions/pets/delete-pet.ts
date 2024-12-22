'use server';

import { revalidatePath } from 'next/cache';

import { isLoggedIn } from '@/lib/actionsUtils';
import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { petIdSchema, TPpetIdSchema } from '@/lib/validations';

export const deletePet = async (id: TPpetIdSchema) => {
  // check for user session
  const session = await isLoggedIn();
  const { success, data: petId } = petIdSchema.safeParse(id);

  if (!success) {
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

    const { name } = await prisma.pet.delete({
      where: { id: petId },
      select: {
        name: true,
      },
    });

    revalidatePath('/app', 'layout');

    return {
      ok: true,
      message: ` Good bye ${name}`,
    };
  } catch (error) {
    return {
      ok: false,
      message: `something checking out ${name}, ${error}`,
    };
  }
};
