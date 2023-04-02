import prisma from '../lib/prisma-server';

export async function getAllIncomeReports() {
  return prisma.income.findMany();
}

export async function getAllIncomeReportsByUserByMonth(userId: any) {
  return prisma.income.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
}

export async function getAllIncomeReportsByUser(userId: any) {
  return prisma.income.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getIncomeSummaryByUser(userId: any) {
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
