import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  await prisma.pet.deleteMany();

  initialData.forEach(async (pet) => {
    await prisma.pet.create({
      data: {
        ...pet,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
