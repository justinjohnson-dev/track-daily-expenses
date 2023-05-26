import prisma from '../lib/prisma-server';

export async function getAllExpenses() {
  try {
    return await prisma.expenses.findMany();
  } catch (error) {
    console.error('Error fetching all expenses: ', error);
    throw error;
  }
}

export async function editUserExpense(expense: {
  id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
}) {
  try {
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
  } catch (error) {
    console.error(`Error editing expense with id ${expense.id}: `, error);
    throw error;
  }
}

export async function editReOccurringUserExpense(expense: {
  id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
}) {
  try {
    return await prisma.reoccurring_expenses.update({
      where: {
        id: expense.id,
      },
      data: {
        expense: expense.expense,
        expenseAmount: Number(expense.expenseAmount),
        expenseCategory: expense.expenseCategory,
      },
    });
  } catch (error) {
    console.error(
      `Error editing reoccurring expense with id ${expense.id}: `,
      error,
    );
    throw error;
  }
}

export async function deleteUserExpense(expense: { id: any }) {
  try {
    return await prisma.expenses.delete({
      where: {
        id: expense.id,
      },
    });
  } catch (error) {
    console.error(`Error deleting expense with id ${expense.id}: `, error);
    throw error;
  }
}

export async function deleteReOccurringUserExpense(expense: { id: any }) {
  try {
    return await prisma.reoccurring_expenses.delete({
      where: {
        id: expense.id,
      },
    });
  } catch (error) {
    console.error(
      `Error deleting reoccurring expense with id ${expense.id}: `,
      error,
    );
    throw error;
  }
}

// Way to combine code with optional month parameter - need to refactor api call first

// export async function getTopFiveExpenseCategoryAndSumSortDesc(userId: string, month?: number) {
//   try {
//     return await prisma.expenses.groupBy({
//       by: ['expenseCategory'],
//       where: {
//         userId: {
//           equals: userId,
//         },
//         ...month && {
//           expenseMonth: {
//             equals: month,
//           },
//         },
//       },
//       _sum: {
//         expenseAmount: true,
//       },
//       _count: {
//         expenseCategory: true,
//       },
//       orderBy: {
//         _count: {
//           expenseCategory: 'desc',
//         },
//       },
//       take: 4,
//     });
//   } catch (error) {
//     console.error("Failed to get top five expense categories and sum sorted descending:", error);
//     throw error;
//   }
// }

export async function getTopFiveExpenseCategoryAndSumSortDescByMonth(
  userId: any,
  month: any,
) {
  try {
    return await prisma.expenses.groupBy({
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
      take: 4,
    });
  } catch (error) {
    console.error(
      `Error getting top five expense categories and sum sorted descending by month: `,
      error,
    );
    throw error;
  }
}

export async function getTopFiveExpenseCategoryAndSumSortDesc(userId: any) {
  try {
    return await prisma.expenses.groupBy({
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
      take: 4,
    });
  } catch (error) {
    console.error(
      `Error getting top five expense categories and sum sorted descending: `,
      error,
    );
    throw error;
  }
}

export async function getAllExpensesByUserByMonth(userId: any) {
  try {
    return await prisma.expenses.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching all expenses by user by month: `, error);
    throw error;
  }
}

export async function getAllReOccurringExpensesByUserByMonth(userId: any) {
  try {
    return await prisma.reoccurring_expenses.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });
  } catch (error) {
    console.error(
      `Error fetching all reoccurring expenses by user by month: `,
      error,
    );
    throw error;
  }
}

export async function getAllExpensesByUser(userId: any) {
  try {
    return await prisma.expenses.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error(`Error fetching all expenses by user: `, error);
    throw error;
  }
}

export async function getExpensesByDescAmountForUserByMonth(
  userId: any,
  month: any,
) {
  try {
    return await prisma.expenses.groupBy({
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
  } catch (error) {
    console.error(
      `Error getting expenses by descending amount for user by month: `,
      error,
    );
    throw error;
  }
}

export async function getExpensesByDescAmountForUser(userId: any) {
  try {
    return await prisma.expenses.groupBy({
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
  } catch (error) {
    console.error(
      `Error getting expenses by descending amount for user: `,
      error,
    );
    throw error;
  }
}

export async function getExpenseSummaryByUser(userId: any) {
  try {
    return await prisma.expenses.groupBy({
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
  } catch (error) {
    console.error(`Error getting expense summary by user: `, error);
    throw error;
  }
}

export async function createExpense(daily_expense: {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  expenseMonth: number;
  userId: string;
  isReoccurringExpense: boolean;
}) {
  try {
    const expenseData = {
      data: daily_expense,
    };

    return await prisma.expenses.create(expenseData);
  } catch (error) {
    console.error('Error creating expense: ', error);
    throw error;
  }
}

export async function createReOccurringExpense(expense: {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  expenseMonth: number;
  userId: string;
  isReoccurringExpense: boolean;
}) {
  try {
    const expenseData = {
      data: expense,
    };

    return await prisma.reoccurring_expenses.create(expenseData);
  } catch (error) {
    console.error('Error creating reoccurring expense: ', error);
    throw error;
  }
}
