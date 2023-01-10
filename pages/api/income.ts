// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllIncomeReports, createIncomeReport } from '../../services/income';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method === 'GET') {
    const expenses = await getAllIncomeReports();
    return res.status(StatusCodes.OK).send(expenses);
  }

  if (method === 'POST') {
    const newExpense = await createIncomeReport(body);
    return res.status(StatusCodes.OK).send(newExpense);
  }
}
