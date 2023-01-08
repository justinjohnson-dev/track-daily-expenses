// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpenses } from '../../../services/expense';
import formatToDatetimeAndFilterBySelectedMonth from '../../../lib/find-reports-by-date';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: selectedMonth } = req;
  if (method === 'GET') {
    const expenses = await getAllExpenses();
    const filteredReportsByDate = formatToDatetimeAndFilterBySelectedMonth(
      expenses,
      Number(selectedMonth.month),
      'expense'
    );

    return res.status(StatusCodes.OK).send(filteredReportsByDate);
  }
}
