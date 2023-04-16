import { useMutation } from 'react-query';

import queryClient from '../../lib/query-client';

interface reOccurringExpenseEntry {
  expense: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseDate: string;
  userId: string;
  isReoccurringExpense: boolean;
}

export default function useReOccurringExpenseMutation() {
  return useMutation(
    (expense: reOccurringExpenseEntry) =>
      fetch('/api/reoccurring_expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reOccurringExpenses');
      },
    },
  );
}
