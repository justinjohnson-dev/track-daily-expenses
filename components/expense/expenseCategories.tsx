import { useSession } from 'next-auth/react';
import React from 'react';
import useExpenseCategoryQuery from '../../hooks/use-expense-categories-query';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseCategoryButton from './expenseCategoryLabel';

export default function ExpenseCategories() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(
      status === 'authenticated' ? session?.user?.id : ''
    );

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && Object.keys(expenseCategories).length) {
    return (
      <div style={{ padding: '2%', margin: '0 0 5% 0' }}>
        <h3>Top 5 expense categories</h3>
        {expenseCategories.map((expense: object, index: number) => {
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
