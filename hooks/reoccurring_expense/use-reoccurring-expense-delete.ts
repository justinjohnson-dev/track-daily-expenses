import { useMutation } from 'react-query';

import queryClient from '../../lib/query-client';

interface expenseEntry {
  id: string;
}

export default function useReOccurringDeleteExpenseMutation(userId: string) {
  return useMutation(
    (DeletedExpense: expenseEntry) =>
      fetch(`/api/reoccurring_expenses/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DeletedExpense),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reOccurringDeletedExpense');
      },
    },
  );
}
