import React from 'react';

interface ExpenseProps {
  data: {
    id: string;
    expense: string;
    expenseAmount: number;
    expenseCategory: string;
    expenseDate: string;
  };
}

function ExpenseList({
  data: { id, expense, expenseAmount, expenseCategory, expenseDate },
}: ExpenseProps) {
  return (
    <div>
      <h2>{id}</h2>
      <h2>{expense}</h2>
      <h2>{expenseAmount}</h2>
      <h2>{expenseCategory}</h2>
      <h2>{expenseDate}</h2>
    </div>
  );
}

export default ExpenseList;
