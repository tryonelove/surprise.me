import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const gift = await prisma.gift.create({
    data: {
      description: 'Some gift idea',
    },
  });

  console.log(gift);
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
