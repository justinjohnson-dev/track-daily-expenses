// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { deleteReOccurringUserExpense } from '../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query, body } = req;
  if (method === 'DELETE') {
    // sending userId to ensure only the correct user can delete
    // can try to add another layer of security to this later
    const userId = query.userId;
    return res
      .status(StatusCodes.OK)
      .send(await deleteReOccurringUserExpense(body));
  }
}
