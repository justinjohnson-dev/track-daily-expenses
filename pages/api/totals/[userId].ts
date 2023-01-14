// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReportsByUser } from '../../../services/income';
import { getAllExpensesByUser } from '../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const incomeReports = await getAllIncomeReportsByUser(query.userId);
    const expenseReports = await getAllExpensesByUser(query.userId);

    const sumOfIncome =
      Math.round(
        incomeReports.reduce(
          (runningSum: number, incomeEntry: any) =>
            runningSum + incomeEntry.incomeAmount,
          0
        ) * 100
      ) / 100;

    const sumOfExpense =
      Math.round(
        expenseReports.reduce(
          (runningSum: number, expenseEntry: any) =>
            runningSum + expenseEntry.expenseAmount,
          0
        ) * 100
      ) / 100;

    return res.status(StatusCodes.OK).send({ sumOfExpense, sumOfIncome });
  }
}
