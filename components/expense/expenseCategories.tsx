import React from 'react';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseCategoryButton from './expenseCategoryLabel';

interface expenseCategoryProps {
  isLoadingExpenses: boolean;
  expenseCategories: [object];
}

export default function ExpenseCategories({
  isLoadingExpenses,
  expenseCategories,
}: expenseCategoryProps) {
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
