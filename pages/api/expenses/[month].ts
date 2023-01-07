// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getExpenseByMonth } from '../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: selectedMonth } = req;
  if (method === 'GET') {
    const expenses = await getExpenseByMonth();

    // find by particular date date -> month
    // TODO: would have to rethink how to store date - this would be terrible and slow for large datasets
    const expensesForCurrentMonth = [];
    expenses.forEach((expense, index) => {
      const expenseDate = expense.expenseDate;
      const dateCutoffValue = expenseDate.indexOf('at');
      const stringDateToConvert = expenseDate.substring(0, dateCutoffValue - 1);
      const expenseMonth = new Date(stringDateToConvert).getMonth() + 1;

      if (Number(selectedMonth.month) === expenseMonth)
        expensesForCurrentMonth.push(expense);
    });

    return res.status(StatusCodes.OK).send(expensesForCurrentMonth);
  }
}
