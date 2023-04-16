// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { editReOccurringUserExpense } from '../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;
  if (method === 'PUT') {
    const edittedExpense = await editReOccurringUserExpense(body);

    return res.status(StatusCodes.OK).send(edittedExpense);
  }
}
