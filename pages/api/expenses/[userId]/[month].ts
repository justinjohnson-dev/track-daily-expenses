// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpensesByUserByMonth } from '../../../../services/expense';

interface expenseObject {
  _id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  userId: string;
  expenseMonth: number;
}

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
      (record: expenseObject) => record.expenseMonth === Number(month)
    );
    const sumOfExpense = finalExpenses.reduce(
      (runningSum: number, expenseEntry: any) =>
        runningSum + expenseEntry.expenseAmount,
      0
    );

    console.info('expenses');
    console.info(expenses);
    console.info('finalExpenses');
    console.info(finalExpenses);
    return res
      .status(StatusCodes.OK)
      .send({ data: finalExpenses, runningSum: sumOfExpense });
  }
}
