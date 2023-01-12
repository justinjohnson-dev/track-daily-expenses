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
  username: string;
  password: string;
}) {
  const userData = {
    data: user,
  };

  return prisma.users.create(userData);
}
