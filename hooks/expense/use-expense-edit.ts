import { useMutation } from 'react-query';

import queryClient from '../lib/query-client';

interface expenseEntry {
  id: string;
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
}

export default function useEditExpenseMutation() {
  return useMutation(
    (updatedExpense: expenseEntry) =>
      fetch('/api/expenses/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('updatedExpense');
      },
    },
  );
}
