import React from 'react';

interface ExpenseProps {
  data: {
    expense: string;
    expenseAmount: number;
    expenseCategory: string;
    expenseDate: string;
  };
}

export default function ExpenseTableItems({
  data: { expense, expenseAmount, expenseCategory, expenseDate },
}: ExpenseProps) {
  const dateCutoffValue = expenseDate.indexOf(' at '); // space between at to avoid 'at' in 'Saturday'
  const stringDateToConvert = expenseDate.substring(0, dateCutoffValue);
  return (
    <tr
      style={{
        borderBottom: '1px solid #dddddd',
      }}
    >
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {expense}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {expenseAmount}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {expenseCategory}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {stringDateToConvert}
      </td>
    </tr>
  );
}
