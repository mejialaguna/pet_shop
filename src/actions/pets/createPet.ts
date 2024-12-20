'use server';

import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export const createPet = async (formData: FormData): Promise<CreatePetResponse> => {
  console.log('formData', formData);
  try {
    await sleep(1000);
    const pet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };

    await prisma.pet.create({
      data: { ...pet },
    });

    ('we can revalidate what we need either way using url path or the folder structure where the action is located');
    // revalidatePath('/app/dashboard');
    revalidatePath('/app', 'layout');

    return {
      ok: true,
      message: `${pet?.name}, is now a part of the family`,
    }
  } catch (error) {
    return {
      ok: false,
      message: `something went wrong creating pets, ${error}`,
    };
  }
};
