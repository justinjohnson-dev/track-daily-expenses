// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getIncomeSummaryByUser } from '../../../services/income';
import { getExpenseSummaryByUser } from '../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const incomeReports = await getIncomeSummaryByUser(query.userId);
    const expenseReports = await getExpenseSummaryByUser(query.userId);
    let income = {
      totalAmount: 0,
      numberOfTransactions: 0,
    };
    let expense = {
      totalAmount: 0,
      numberOfTransactions: 0,
    };

    if (incomeReports.length !== 0) {
      income = {
        totalAmount: incomeReports[0]['_sum']['incomeAmount'],
        numberOfTransactions: incomeReports[0]['_count']['incomeCategory'],
      };
    }

    if (expenseReports.length !== 0) {
      expense = {
        totalAmount: expenseReports[0]['_sum']['expenseAmount'],
        numberOfTransactions: expenseReports[0]['_count']['expenseCategory'],
      };
    }

    return res.status(StatusCodes.OK).send({
      income,
      expense,
    });
  }
}
