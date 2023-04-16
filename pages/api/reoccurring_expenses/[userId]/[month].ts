// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllReOccurringExpensesByUserByMonth } from '../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  if (method === 'GET') {
    const userId = query.userId;
    const month = Number(query.month);

    const reoccurringExpenses = await getAllReOccurringExpensesByUserByMonth(
      userId,
    );
    const finalExpenses = reoccurringExpenses.filter(
      (record) => record.expenseMonth === month,
    );

    return res.status(StatusCodes.OK).send({ data: finalExpenses });
  }
}
