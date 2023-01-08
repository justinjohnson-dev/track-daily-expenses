// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReports } from '../../../services/income';
import formatToDatetimeAndFilterBySelectedMonth from '../../../lib/find-reports-by-date';

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
    return res.status(StatusCodes.OK).send(filteredReportsByDate);
  }
}
