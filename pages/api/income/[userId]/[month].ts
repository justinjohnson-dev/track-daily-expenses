// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReportsByUser } from '../../../../services/income';
import formatToDatetimeAndFilterBySelectedMonth from '../../../../lib/find-reports-by-date';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === 'GET') {
    const incomeReports = await getAllIncomeReportsByUser(query.userId);
    const filteredReportsByDate = formatToDatetimeAndFilterBySelectedMonth(
      incomeReports,
      Number(query.month),
      'income'
    );

    const sumOfIncome = filteredReportsByDate.reduce(
      (runningSum: number, incomeEntry: any) =>
        runningSum + incomeEntry.incomeAmount,
      0
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: filteredReportsByDate, runningSum: sumOfIncome });
  }
}
