'use server';

import prisma from '@/lib/prisma';
import { ok } from 'assert';
import { revalidatePath } from 'next/cache';

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