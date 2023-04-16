/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import useExpenseQuery from '../../hooks/expense/use-expense-query';
import { reverseMonthLookup } from '../../lib/month-lookup';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseTableItems from './expenseTableItems';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReOccurringExpenses from './reoccurringExpenses';

type expenseTableProps = {
  sub: string;
  month: number;
  currentIncomeSum: number;
  filterValue: string;
};

export default function ExpenseTable({
  sub,
  month,
  currentIncomeSum,
  filterValue,
}: expenseTableProps) {
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    refetch,
  } = useExpenseQuery(sub, month);
  const [amountSortDirectionAscending, setAmountSortDirectionAscending] =
    useState<boolean>(false);
  let filteredData = [];

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && expenses.data.length > 0) {
    console.log(amountSortDirectionAscending);
    // THIS COULD BE SEPARATED TO MAKE THIS LESS COMPLICATED: TODO FOR LATER ;)
    if (amountSortDirectionAscending === true) {
      expenses.data.sort(
        (a: { expenseAmount: number }, b: { expenseAmount: number }) =>
          a.expenseAmount - b.expenseAmount,
      );
    } else {
      console.log('inside descending');
      expenses.data.sort(
        (a: { expenseAmount: number }, b: { expenseAmount: number }) =>
          b.expenseAmount - a.expenseAmount,
      );
    }
    if (filterValue) {
      console.log('inside filter');
      filteredData = expenses.data.filter(
        (expense: { [x: string]: string }) =>
          expense['expense'].toLowerCase() &&
          expense['expense']
            .toLowerCase()
            .indexOf(filterValue.toLowerCase()) !== -1,
      );
    }

    const tableBodyData = () => {
      if (
        !isLoadingExpenses &&
        expenses.data !== undefined &&
        filteredData.length === 0
      ) {
        return expenses.data.map((expense: any, index: number) => {
          return (
            <ExpenseTableItems
              key={index}
              data={expense}
              refetch={refetch}
              expense_api={'expense'}
            />
          );
        });
      }

      if (!isLoadingExpenses && filteredData.length > 0) {
        return filteredData.map((expense: any, index: number) => {
          return (
            <ExpenseTableItems
              key={index}
              data={expense}
              refetch={refetch}
              expense_api={'expense'}
            />
          );
        });
      }
    };

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
                Math.round(expenses.runningSum * 100) / 100,
            )}
          </code>
        </div>
        <div style={{ margin: '1rem 1rem 0 1rem' }}>
          <ReOccurringExpenses />
        </div>
        <div style={{ margin: '25px 0' }}>
          <table
            style={{
              margin: '0 auto',
              width: '95%',
              borderCollapse: 'collapse',
              fontSize: '0.9em',
              fontFamily: 'sans-serif',
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
                        !amountSortDirectionAscending,
                      )
                    }
                  >
                    {amountSortDirectionAscending === true && (
                      <span>
                        Amount{' '}
                        <KeyboardArrowUpIcon
                          style={{
                            height: '15px',
                            width: '15px',
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
                            width: '15px',
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
                ></th>
              </tr>
            </thead>
            <tbody>{tableBodyData()}</tbody>
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
