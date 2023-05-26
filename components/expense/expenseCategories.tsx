import React from 'react';
import CircularIndeterminate from '../circularLoadingBar';
import ExpenseCategoryButton from './expenseCategoryLabel';

import { roundToTwoDecimalPlaces } from '../../utils/math';

interface ExpenseCategory {
  expenseCategory: string;
  _count: {
    expenseCategory: number;
  };
  _sum: {
    expenseAmount: number;
  };
}

interface expenseCategoryProps {
  isLoadingExpenses: boolean;
  expenseCategories: ExpenseCategory[];
}

export default function ExpenseCategories({
  isLoadingExpenses,
  expenseCategories,
}: expenseCategoryProps) {
  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (expenseCategories.length === 0) {
    return (
      <div style={{ width: '100%' }}>
        <h3 style={{ textAlign: 'center' }}>No expense categories</h3>
      </div>
    );
  } else {
    return (
      <div style={{ padding: '2%', margin: '0 0 5% 0' }}>
        <h3>{`Top ${expenseCategories.length} expense categories`}</h3>
        {expenseCategories.map((expense: object, index: number) => {
          return (
            <ExpenseCategoryButton
              key={index + expense['expenseCategory']}
              category={expense['expenseCategory']}
              categoryValue={expense['_count']['expenseCategory']}
              categoryAmount={roundToTwoDecimalPlaces(
                expense['_sum']['expenseAmount'],
              )}
            />
          );
        })}
      </div>
    );
  }
}
