// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { createUser } from '../../../services/user';

import bcrypt from 'bcrypt';
const saltRounds = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method === 'POST') {
    if (body) {
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(body.password, salt);
        })
        .then(async (hash) => {
          body.password = hash;
          const newUser = await createUser(body);
          return res.status(StatusCodes.OK).send(newUser);
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(500);
        });
    } else {
      return res.status(StatusCodes.NO_CONTENT).send(204);
    }
  }
}
