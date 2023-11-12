import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function getUserByEmailAsync(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const {
          data: { email, password },
        } = parsedCredentials;

        const user = await getUserByEmailAsync(email);
        if (!user) {
          return null;
        }

        const isMatchingPassword = await bcrypt.compare(
          password,
          user.password,
        );
        if (!isMatchingPassword) {
          console.error('Invalid credentials');

          return null;
        }

        return user;
      },
    }),
  ],
});
