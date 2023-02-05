// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReportsByUserByMonth } from '../../../../services/income';

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
      (record) => record.incomeMonth === Number(month)
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
