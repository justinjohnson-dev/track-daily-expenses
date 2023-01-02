import { useMutation, useQuery } from 'react-query';

import queryClient from '../../lib/query-client';

export function useExpenses() {
  return useQuery('expenses', () =>
    fetch('/api/expenses').then((res) => res.json()),
  );
}

export function useCreateExpense() {
  return useMutation(
    (expense) =>
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
    },
  );
}
