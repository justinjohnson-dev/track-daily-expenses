// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getExpensesByDescAmountForUserByMonth } from '../../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  if (method === 'GET') {
    const month = query.month;
    const userId = query.userId;

    const userExpenseMetricsByMonth =
      await getExpensesByDescAmountForUserByMonth(
        String(userId),
        Number(month),
      );

    return res.status(StatusCodes.OK).send(userExpenseMetricsByMonth);
  }
}
