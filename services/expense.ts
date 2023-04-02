import prisma from '../lib/prisma-server';

export async function getAllExpenses() {
  return prisma.expenses.findMany();
}

export async function editUserExpense(expense: {
  id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
}) {
  return await prisma.expenses.update({
    where: {
      id: expense.id,
    },
    data: {
      expense: expense.expense,
      expenseAmount: Number(expense.expenseAmount),
      expenseCategory: expense.expenseCategory,
    },
  });
}

export async function deleteUserExpense(expense: { id: string }) {
  return await prisma.expenses.delete({
    where: {
      id: expense.id,
    },
  });
}

export async function getTopFiveExpenseCategoryAndSumSortDescByMonth(
  userId: string,
  month: number
) {
  return prisma.expenses.groupBy({
    by: ['expenseCategory'],
    where: {
      userId: {
        equals: userId,
      },
      expenseMonth: {
        equals: month,
      },
    },
    _sum: {
      expenseAmount: true,
    },
    _count: {
      expenseCategory: true,
    },
    orderBy: {
      _count: {
        expenseCategory: 'desc',
      },
    },
    take: 5,
  });
}

export async function getTopFiveExpenseCategoryAndSumSortDesc(userId: string) {
  return prisma.expenses.groupBy({
    by: ['expenseCategory'],
    where: {
      userId: {
        equals: userId,
      },
    },
    _sum: {
      expenseAmount: true,
    },
    _count: {
      expenseCategory: true,
    },
    orderBy: {
      _count: {
        expenseCategory: 'desc',
      },
    },
    take: 5,
  });
}

export async function getAllExpensesByUserByMonth(userId: any) {
  return prisma.expenses.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
}

export async function getAllExpensesByUser(userId: string) {
  return prisma.expenses.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getExpensesByDescAmountForUserByMonth(
  userId: string,
  month: number
) {
  return prisma.expenses.groupBy({
    by: ['expenseCategory'],
    where: {
      userId: {
        equals: userId,
      },
      expenseMonth: {
        equals: month,
      },
    },
    _sum: {
      expenseAmount: true,
    },
    _count: {
      expenseCategory: true,
    },
    orderBy: {
      _sum: {
        expenseAmount: 'desc',
      },
    },
    take: 5,
  });
}

export async function getExpensesByDescAmountForUser(userId: string) {
  return prisma.expenses.groupBy({
    by: ['expenseCategory'],
    where: {
      userId: {
        equals: userId,
      },
    },
    _sum: {
      expenseAmount: true,
    },
    _count: {
      expenseCategory: true,
    },
    orderBy: {
      _sum: {
        expenseAmount: 'desc',
      },
    },
    take: 5,
  });
}

export async function getExpenseSummaryByUser(userId: string) {
  return prisma.expenses.groupBy({
    by: ['userId'],
    where: {
      userId: {
        equals: userId,
      },
    },
    _sum: {
      expenseAmount: true,
    },
    _count: {
      expenseCategory: true,
    },
  });
}

export async function createExpense(daily_expense: {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  expenseMonth: number;
  userId: string;
}) {
  const expenseData = {
    data: daily_expense,
  };

  return prisma.expenses.create(expenseData);
}
