import { initialData } from './seed';
import prisma from '../lib/prisma';

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
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
