import prisma from '../lib/prisma-server';

export async function getUserData(email: string) {
  return prisma.users.findFirst({
    where: {
      email: email,
    },
  });
}

export async function createUser(user: {
  email: string;
  username: number;
  password: string;
}) {
  return prisma.users.create({
    data: user,
  });
}
