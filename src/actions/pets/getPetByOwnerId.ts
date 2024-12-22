'use server';

import prisma from '@/lib/prisma';

export const getPetByOwnerId = async (petOwnerId: string) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId: petOwnerId,
      },
      select: {
        id: true,
        name: true,
        ownerName: true,
        imageUrl: true,
        age: true,
        notes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { ok: true, pets };
  } catch (error) {
    throw new Error(`somethig went wrong fetching all products, ${error}`);
  }
};
