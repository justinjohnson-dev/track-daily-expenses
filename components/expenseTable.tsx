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
      <p>
        {expense}/{expenseAmount}/{expenseCategory}/{expenseDate}
      </p>
    </div>
  );
}

export default ExpenseList;
