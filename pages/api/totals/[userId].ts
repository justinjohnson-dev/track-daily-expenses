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

    const income = {
      totalAmount: incomeReports[0]['_sum']['incomeAmount'],
      numberOfTransactions: incomeReports[0]['_count']['incomeCategory'],
    };

    const expense = {
      totalAmount: expenseReports[0]['_sum']['expenseAmount'],
      numberOfTransactions: expenseReports[0]['_count']['expenseCategory'],
    };

    return res.status(StatusCodes.OK).send({
      income,
      expense,
    });
  }
}
