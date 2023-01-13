// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpensesByUser } from '../../../services/expense';
import formatToDatetimeAndFilterBySelectedMonth from '../../../lib/find-reports-by-date';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const expenses = await getAllExpensesByUser('63bf09130474b38bcc8b6027');
    console.log(expenses);
    const filteredReportsByDate = formatToDatetimeAndFilterBySelectedMonth(
      expenses,
      Number(query.month),
      'expense'
    );

    const sumOfExpense = filteredReportsByDate.reduce(
      (runningSum: number, expenseEntry: any) =>
        runningSum + expenseEntry.expenseAmount,
      0
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: filteredReportsByDate, runningSum: sumOfExpense });
  }
}
