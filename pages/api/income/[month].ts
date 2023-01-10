// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReports } from '../../../services/income';
import formatToDatetimeAndFilterBySelectedMonth from '../../../lib/find-reports-by-date';

type incomeTypes = {
  incomeName: string;
  incomeAmount: number;
  incomeCategory: string;
  incomeDate: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: selectedMonth } = req;
  if (method === 'GET') {
    const incomeReports = await getAllIncomeReports();
    const filteredReportsByDate = formatToDatetimeAndFilterBySelectedMonth(
      incomeReports,
      Number(selectedMonth.month),
      'income'
    );

    const sumOfIncome = filteredReportsByDate.reduce(
      (runningSum: number, incomeEntry: incomeTypes) =>
        runningSum + incomeEntry.incomeAmount,
      0
    );

    return res
      .status(StatusCodes.OK)
      .send({ data: filteredReportsByDate, runningSum: sumOfIncome });
  }
}
