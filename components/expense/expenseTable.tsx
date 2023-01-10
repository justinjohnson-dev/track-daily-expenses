/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import useExpenseQuery from '../../hooks/use-expense-query';
import { reverseMonthLookup } from '../../lib/month-lookup';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseTableItems from './expenseTableItems';

type expenseTableProps = {
  month: number;
  currentIncomeSum: number;
};

export default function ExpenseTable({
  month,
  currentIncomeSum,
}: expenseTableProps) {
  const [currentExpenseSum, setCurrentExpenseSum] = useState<number>(0);
  const { data: expenses, isLoading: isLoadingExpenses } =
    useExpenseQuery(month);

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
  }, [expenses, currentExpenseSum, month]);

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && expenses.length > 0) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5%',
              width: '70%',
            }}
          >
            <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
              Number of transactions:
              {expenses !== undefined && expenses.length}
            </code>
            <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
              {reverseMonthLookup[month]} Spending: $
              {Math.round(currentExpenseSum * 100) / 100}
            </code>
          </div>
          <code
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              width: '20%',
            }}
          >
            I/E: $
            {Math.round(currentIncomeSum * 100) / 100 -
              Math.round(currentExpenseSum * 100) / 100}
          </code>
        </div>
        <div>
          <table
            style={{
              borderCollapse: 'collapse',
              margin: '25px 0',
              fontSize: '0.9em',
              fontFamily: 'sans-serif',
              minWidth: '400px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#009879',
                  color: '#ffffff',
                  textAlign: 'left',
                }}
              >
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Expense
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingExpenses &&
                expenses !== undefined &&
                expenses.map((expense: any, index: number) => {
                  return <ExpenseTableItems key={index} data={expense} />;
                })}
            </tbody>
          </table>{' '}
        </div>
      </>
    );
  } else {
    return (
      <div style={{ width: '100%' }}>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          No Expense Data!
        </h3>
      </div>
    );
  }
}
