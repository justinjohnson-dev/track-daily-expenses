// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getUserData } from '../../services/user';

import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method === 'POST') {
    const userData = await getUserData(body.email);
    if (userData) {
      bcrypt
        .compare(body.password, userData.password)
        .then((validated: boolean) => {
          if (validated) {
            return res.status(StatusCodes.OK).send(userData);
          } else {
            return res.status(StatusCodes.UNAUTHORIZED).send(401);
          }
        })
        .catch((err: { message: string }) => console.error(err.message));
    } else {
      return res.status(StatusCodes.NOT_FOUND).send(404);
    }
  }
}
