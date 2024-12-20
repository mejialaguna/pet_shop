'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { petIdSchema, TPpetIdSchema } from '@/lib/validations';

export const deletePet = async (id: TPpetIdSchema) => {
  const { success, data: petId } = petIdSchema.safeParse(id);

    if (!success) {
      return {
        ok: false,
        message: 'Something went wrong updating, invalid pet data.',
      };
    }
  
  await sleep(1000);

  try {
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