import prisma from '../lib/prisma-server';

export async function getAllIncomeReports() {
  return prisma.income.findMany();
}

export async function getAllIncomeReportsByUser(userId) {
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
  userId: string;
}) {
  return prisma.income.create({ data: income_report });
}
