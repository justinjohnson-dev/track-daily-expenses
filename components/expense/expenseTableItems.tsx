import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import FullScreenEditExpenseModal from './modals/editExpenseModal';

interface ExpenseProps {
  data: {
    id: string;
    expense: string;
    expenseAmount: number;
    expenseCategory: string;
    expenseDate: string;
  };
  refetch: any;
  expense_api: string;
}

export default function ExpenseTableItems({
  data: { id, expense, expenseAmount, expenseCategory, expenseDate },
  refetch,
  expense_api,
}: ExpenseProps) {
  const expenseRow = {
    id,
    expense,
    expenseAmount,
    expenseCategory,
    expenseDate,
  };
  const [isModalActive, setIsModalActive] = useState(false);

  const updateModalStatus = (value: boolean) => {
    setIsModalActive(value);
  };

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
        <span style={{ display: 'flex' }}>
          {' '}
          <EditIcon onClick={() => setIsModalActive(true)} />
          {isModalActive === true && (
            <FullScreenEditExpenseModal
              expense={expenseRow}
              isEditModalActive={isModalActive}
              updateModalStatus={updateModalStatus}
              refetch={refetch}
              expense_api={expense_api}
            />
          )}
        </span>
      </td>
    </tr>
  );
}
