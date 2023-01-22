import React from 'react';
import { useSession } from 'next-auth/react';
import useExpenseCategoryAmountQuery from '../../hooks/use-expense-category-amount';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseCategoryButton from './expenseCategoryLabel';

export default function ExpenseCategoryAmounts() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: expenseAmounts, isLoading: isLoadingExpenses } =
    useExpenseCategoryAmountQuery(
      status === 'authenticated' ? session?.user?.id : ''
    );
  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && Object.keys(expenseAmounts).length) {
    return (
      <div style={{ padding: '2%', margin: '0 0 5% 0' }}>
        <h3>Top 5 expense amounts</h3>
        {expenseAmounts.map((expense: object, index: number) => {
          return (
            <ExpenseCategoryButton
              key={index}
              category={expense['expenseCategory']}
              categoryValue={expense['_count']['expenseCategory']}
              categoryAmount={
                Math.round(expense['_sum']['expenseAmount'] * 100) / 100
              }
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div style={{ width: '100%' }}>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          No expense categories
        </h3>
      </div>
    );
  }
}
