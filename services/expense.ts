import prisma from '../lib/prisma-server';

export async function getAllExpenses() {
  return prisma.expenses.findMany();
}

export async function getTopFiveExpenseCategoryAndSumSortDescByMonth(
  userId,
  month
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

export async function getTopFiveExpenseCategoryAndSumSortDesc(userId) {
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

  // return prisma.expenses.aggregate(
  //   {
  //     $match: {
  //       $and: [{ userId: { $eq: '63bf09130474b38bcc8b6027' } }],
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$expenseCategory',
  //       sum: { $sum: '$expenseAmount' },
  //       count: { $sum: 1 },
  //     },
  //   }
  // );
}

// mongo db query to get sum of all users expenses sorted from most/least
// db.getCollection('expenses').aggregate({ $match: {
//   $and: [
//       { userId: { $eq: "63bf09130474b38bcc8b6027" } }
//   ]
// } },
// { $group: { _id : "$expenseCategory", sum : { $sum: "$expenseAmount" } }}, {$sort: {sum:1}} );

// mongodb user expense count and max
// db.expenses.aggregate([
//   {"$group" : {_id:"$userId", sum : { $sum: "$expenseAmount" },count:{$sum:1}}}, {$sort: {count:-1}}
// ])

export async function getAllExpensesByUserByMonth(userId) {
  return prisma.expenses.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
}

export async function getAllExpensesByUser(userId) {
  return prisma.expenses.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getExpensesByDescAmountForUserByMonth(userId, month) {
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

export async function getExpensesByDescAmountForUser(userId) {
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

export async function getExpenseSummaryByUser(userId) {
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
