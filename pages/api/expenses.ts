// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpenses, createExpense } from '../../services/expense';

// type Expense = {
//   expense: string;
//   expenseAmount: number;
//   expenseCategory: string;
//   expenseDate: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;
  if (method === 'GET') {
    const expenses = await getAllExpenses();
    return res.status(StatusCodes.OK).send(expenses);
  }

  if (method === 'POST') {
    const newExpense = await createExpense(body);
    return res.status(StatusCodes.OK).send(newExpense);
  }
}
