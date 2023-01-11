// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getUserData } from '../../services/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method === 'POST') {
    const userData = await getUserData('jjustin634@gmail.com');
    console.log('user data');
    console.log(userData);
    return res.status(StatusCodes.OK).send(userData);
  }
}
