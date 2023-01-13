import prisma from '../lib/prisma-server';

export async function getAllIncomeReports() {
  return prisma.income.findMany();
}

export async function getAllIncomeReportsByUser(userId) {
  return prisma.income.findMany({
    where: {
      userId: userId,
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
