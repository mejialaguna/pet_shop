'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';

export const deletePet = async (id: string) => {
  try {
    const { name } = await prisma.pet.delete({
      where: { id },
      select: {
        name: true,
      }
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