import { useMutation, useQuery } from 'react-query';

import queryClient from '../../lib/query-client';

export function useIncome() {
  return useQuery('expenses', () =>
    fetch('/api/income').then((res) => res.json()),
  );
}

export function useCreateIncome() {
  return useMutation(
    (income) =>
      fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('income');
      },
    },
  );
}
