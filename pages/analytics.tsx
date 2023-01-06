import { useEffect, useState } from 'react';

import useExpenseQuery from '../hooks/use-expense-query';
import useIncomeQuery from '../hooks/use-income-query';

import IncomeList from '../components/income/incomeList';
import ExpenseList from '../components/expense/expenseList';

import Layout from '../components/layout';

export default function Analytics() {
  const { data: expenses, isLoading: isLoadingExpenses } = useExpenseQuery();
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery();
  const [currentExpenseSum, setCurrentExpenseSum] = useState<number>(0);
  const [currentIncomeSum, setCurrentIncomeSum] = useState<number>(0);

  useEffect(() => {
    if (expenses) {
      const sumOfExpenses = expenses.reduce(function (
        runningSum: any,
        expense: { expenseAmount: any }
      ) {
        return runningSum + expense.expenseAmount;
      },
      0);
      setCurrentExpenseSum(sumOfExpenses);
    }
  }, [expenses, currentExpenseSum]);

  useEffect(() => {
    if (income) {
      const sumOfIncome = income.reduce(function (
        runningSum: any,
        incomeEntry: { incomeAmount: any }
      ) {
        return runningSum + incomeEntry.incomeAmount;
      },
      0);
      setCurrentIncomeSum(sumOfIncome);
    }
  }, [income, currentIncomeSum]);
  return (
    <>
      <Layout />
      <div>
        {' '}
        {!isLoadingExpenses &&
          expenses !== undefined &&
          expenses.map((expense: any, index: number) => {
            return <ExpenseList key={index} data={expense} />;
          })}
      </div>
      <div>
        <code>
          January Spending: ${Math.round(currentExpenseSum * 100) / 100}
        </code>
      </div>
      <hr />
      <div>
        {' '}
        {!isLoadingIncome &&
          income !== undefined &&
          income.map((incomeEntry: any, index: number) => {
            return <IncomeList key={index} data={incomeEntry} />;
          })}
      </div>
      <div>
        <code>January Income: ${currentIncomeSum}</code>
      </div>
    </>
  );
}
