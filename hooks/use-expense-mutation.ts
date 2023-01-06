import { useMutation } from 'react-query';

import queryClient from '../lib/query-client';

interface expenseEntry {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
}

export default function useExpenseMutation() {
  return useMutation(
    (expense: expenseEntry) =>
      fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('expenses');
      },
    }
  );
}
