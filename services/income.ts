import prisma from '../lib/prisma-server';

export async function getAllIncomeReports() {
  return prisma.income.findMany();
}

export async function getAllIncomeReportsByUserByMonth(userId, month) {
  return prisma.income.findMany({
    where: {
      userId: {
        equals: userId,
      },
      incomeMonth: {
        equals: month,
      },
    },
  });
}

export async function getAllIncomeReportsByUser(userId) {
  return prisma.income.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getIncomeSummaryByUser(userId) {
  return prisma.income.groupBy({
    by: ['userId'],
    where: {
      userId: {
        equals: userId,
      },
    },
    _sum: {
      incomeAmount: true,
    },
    _count: {
      incomeCategory: true,
    },
  });
}

export async function createIncomeReport(income_report: {
  incomeName: string;
  incomeAmount: number;
  incomeCategory: string;
  incomeDate: string;
  incomeMonth: number;
  userId: string;
}) {
  return prisma.income.create({ data: income_report });
}
