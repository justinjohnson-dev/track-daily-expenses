import prisma from '../lib/prisma-server';

export async function getAllExpenses() {
  return prisma.expenses.findMany();
}

export async function createExpense(daily_expense: {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: String; // }
}) {
  return prisma.expenses.create({ data: daily_expense });
}
