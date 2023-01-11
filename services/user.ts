import prisma from '../lib/prisma-server';

export async function getUserData(email: string) {
  return prisma.users.findMany({
    where: {
      email: email,
    },
  });
}
