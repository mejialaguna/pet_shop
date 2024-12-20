'use server';

import prisma from '@/lib/prisma';

export const getPets = async () => {
  try {
    const pets = await prisma.pet.findMany({
      select: {
        id: true,
        name: true,
        ownerName: true,
        imageUrl: true,
        age: true,
        notes: true,
      }
    });
    return {ok: true, pets}
  } catch (error) {
    throw new Error(`somethig went wrong fetching all products, ${error}`);
  }
}