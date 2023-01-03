import prisma from '../lib/prisma-server';

interface expenseDataInterface {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
}

export async function getAllExpenses() {
  return prisma.expenses.findMany();
}

export async function createExpense(daily_expense: {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: String; // }
}) {
  const expenseData = {
    data: daily_expense,
  };

  return prisma.expenses.create(expenseData);
}
