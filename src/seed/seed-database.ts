import bcrypt from 'bcrypt';

import { initialData, users } from './seed';
import prisma from '../lib/prisma';

async function main() {
  // Clean up existing data
  await prisma.pet.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords for seed users
  const sanetizedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      email: user.email.toLowerCase().trim(),
      password: await bcrypt.hash('dimelo', 10),
    }))
  );

  // Seed users
  await prisma.user.createMany({
    data: sanetizedUsers,
  });

  // Seed pets
  for (const pet of initialData) {
    const owner = users.find((user) => user.name === pet.ownerName);
    if (owner) {
      await prisma.pet.create({
        data: {
          id: pet.id,
          name: pet.name,
          ownerName: pet.ownerName,
          imageUrl: pet.imageUrl,
          age: pet.age,
          notes: pet.notes,
          user: {
            connect: {
              id: owner.id, // Connect to the User by id
            },
          },
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
