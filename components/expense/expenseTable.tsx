/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import useExpenseQuery from '../../hooks/use-expense-query';
import { reverseMonthLookup } from '../../lib/month-lookup';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseTableItems from './expenseTableItems';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useSession } from 'next-auth/react';
import { TextField } from '@mui/material';

type expenseTableProps = {
  month: number;
  currentIncomeSum: number;
  filterValue: string;
};

export default function ExpenseTable({
  month,
  currentIncomeSum,
  filterValue,
}: expenseTableProps) {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: expenses, isLoading: isLoadingExpenses } = useExpenseQuery(
    status === 'authenticated' ? session.user.id : '',
    month
  );
  const [amountSortDirectionAscending, setAmountSortDirectionAscending] =
    useState<boolean>(false);

  let filteredData = [];

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && expenses.data.length > 0) {
    // THIS COULD BE SEPARATED TO MAKE THIS LESS COMPLICATED: TODO FOR LATER ;)
    if (amountSortDirectionAscending) {
      expenses.data.sort(
        (a: { expenseAmount: number }, b: { expenseAmount: number }) =>
          a.expenseAmount - b.expenseAmount
      );
    } else {
      expenses.data.sort(
        (a: { expenseAmount: number }, b: { expenseAmount: number }) =>
          b.expenseAmount - a.expenseAmount
      );
    }
    if (filterValue) {
      filteredData = expenses.data.filter(
        (expense: { [x: string]: string }) =>
          expense['expense'].toLowerCase() &&
          expense['expense']
            .toLowerCase()
            .indexOf(filterValue.toLowerCase()) !== -1
      );
    }
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
              {expenses.data !== undefined && expenses.data.length}
            </code>
            <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
              {reverseMonthLookup[month]} Spending: $
              {Math.round(expenses.runningSum * 100) / 100}
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
            {Math.round(
              Math.round(currentIncomeSum * 100) / 100 -
                Math.round(expenses.runningSum * 100) / 100
            )}
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
                  <button
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                      outline: 'none',
                      border: 'none',
                    }}
                    onClick={() =>
                      setAmountSortDirectionAscending(
                        !amountSortDirectionAscending
                      )
                    }
                  >
                    {amountSortDirectionAscending === true && (
                      <span>
                        Amount{' '}
                        <KeyboardArrowUpIcon
                          style={{
                            height: '15px',
                            position: 'absolute',
                          }}
                        />
                      </span>
                    )}
                    {amountSortDirectionAscending === false && (
                      <span>
                        Amount{' '}
                        <KeyboardArrowDownIcon
                          style={{
                            height: '15px',
                            position: 'absolute',
                          }}
                        />
                      </span>
                    )}
                  </button>
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
                expenses.data !== undefined &&
                filteredData.length === 0 &&
                expenses.data.map((expense: any, index: number) => {
                  return <ExpenseTableItems key={index} data={expense} />;
                })}

              {!isLoadingExpenses &&
                filteredData.length > 0 &&
                filteredData.map((expense: any, index: number) => {
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
