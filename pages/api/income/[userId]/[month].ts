// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReportsByUserByMonth } from '../../../../services/income';

interface IncomeObject {
  _id: string;
  incomeAmount: number;
  incomeCategory: string;
  incomeDate: string;
  incomeName: string;
  userId: string;
  incomeMonth: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const userId = query.userId;
    const month = query.month;

    const incomeReports = await getAllIncomeReportsByUserByMonth(userId);
    const finalIncomeReports = incomeReports.filter(
      (record: IncomeObject) => record.incomeMonth === Number(month)
    );

    const sumOfIncome = finalIncomeReports.reduce(
      (runningSum: number, incomeEntry: any) =>
        runningSum + incomeEntry.incomeAmount,
      0
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: finalIncomeReports, runningSum: sumOfIncome });
  }
}
