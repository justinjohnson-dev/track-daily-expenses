// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpensesByUserByMonth } from '../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const userId = query.userId;
    const month = query.month;

    const expenses = await getAllExpensesByUserByMonth(userId);
    const finalExpenses = expenses.filter(
      (record) => record.expenseMonth === Number(month)
    );
    const sumOfExpense = expenses.reduce(
      (runningSum: number, expenseEntry: any) =>
        runningSum + expenseEntry.expenseAmount,
      0
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: finalExpenses, runningSum: sumOfExpense });
  }
}
