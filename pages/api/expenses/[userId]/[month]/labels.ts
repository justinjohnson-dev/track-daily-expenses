// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getTopFiveExpenseCategoryAndSumSortDescByMonth } from '../../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const userId = query.userId;
    const month = query.month;

    const userExpenseMetrics =
      await getTopFiveExpenseCategoryAndSumSortDescByMonth(
        userId,
        Number(month)
      );

    return res.status(StatusCodes.OK).send(userExpenseMetrics);
  }
}
