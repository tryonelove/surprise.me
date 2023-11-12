import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const wish = await prisma.wish.create({
    data: {
      description: 'Some gift idea',
    },
  });

  console.log(`Created wish with id: ${wish.id}`);

  const user = await prisma.user.create({
    data: {
      email: 'test@email.com',
      name: 'Ilya',
      password: await bcrypt.hash('password', 10),
    },
  });

  console.log(`Created user with id: ${user.id} | email: ${user.email}`);
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
