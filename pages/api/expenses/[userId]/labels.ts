// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { getAllExpensesByUser } from '../../../../services/expense';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: user } = req;
  if (method === 'GET') {
    const expenses = await getAllExpensesByUser(user.userId);
    const expenseCategories: { [id: string]: number } = {};

    // return top 5 labels for expenses with word count
    // need to handle this in database as data grows in size
    expenses.forEach((expense, index) => {
      if (expenseCategories[expense.expenseCategory]) {
        expenseCategories[expense.expenseCategory] += 1;
      } else {
        expenseCategories[expense.expenseCategory] = 1;
      }
    });

    const sortedCategoryDictionary = Object.fromEntries(
      Object.entries(expenseCategories)
        .sort(([, compA], [, compB]): number => compB - compA)
        .slice(0, 5) // top 5
    );

    return res.status(StatusCodes.OK).send(sortedCategoryDictionary);
  }
}
