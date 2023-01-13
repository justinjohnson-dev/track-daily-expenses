import { useSession } from 'next-auth/react';
import React from 'react';
import useExpenseCategoryQuery from '../../hooks/use-expense-categories-query';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseCategoryButton from './expenseCategoryLabel';

export default function ExpenseCategories() {
  const { data: session, status } = useSession();
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(status === 'authenticated' ? session.user.id : '');

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && expenseCategories) {
    const keys = Object.keys(expenseCategories);

    return (
      <div style={{ padding: '2%', margin: '0 0 5% 0' }}>
        <h3>Top 5 expense categories</h3>
        {keys.map((expenseCategory, index) => {
          return (
            <ExpenseCategoryButton
              key={index}
              category={expenseCategory}
              categoryValue={expenseCategories[expenseCategory]}
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
