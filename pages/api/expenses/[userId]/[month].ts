import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpensesByUserByMonth } from '../../../../services/expense';

interface ExpenseObject {
  id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  expenseMonth: number;
  isReoccurringExpense: boolean;
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ error: 'Invalid request method' });
  }

  const { userId, month } = query;
  if (!userId || !month) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Missing required parameters' });
  }

  try {
    const userId = Array.isArray(query.userId) ? query.userId[0] : query.userId;
    const month = Array.isArray(query.month)
      ? Number(query.month[0])
      : Number(query.month);

    const expenses: ExpenseObject[] = await getAllExpensesByUserByMonth(
      userId,
      month,
    );

    const sumOfExpense = expenses.reduce(
      (runningSum: number, expenseEntry: ExpenseObject) =>
        runningSum + expenseEntry.expenseAmount,
      0,
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: expenses, runningSum: sumOfExpense });
  } catch (error) {
    console.error(`Error handling GET request: `, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while processing your request' });
  }
}
