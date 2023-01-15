// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getTopFiveExpenseCategoryAndSumSortDesc } from '../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: user } = req;
  if (method === 'GET') {
    const userExpenseMetrics = await getTopFiveExpenseCategoryAndSumSortDesc(
      user.userId
    );

    return res.status(StatusCodes.OK).send(userExpenseMetrics);
  }
}
