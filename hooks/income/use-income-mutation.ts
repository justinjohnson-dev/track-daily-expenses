import { useMutation } from 'react-query';

import queryClient from '../../lib/query-client';

interface incomeEntry {
  incomeName: string;
  incomeAmount: number;
  incomeCategory: string;
  incomeDate: string;
}

export default function useIncomeMutation() {
  return useMutation(
    (income: incomeEntry) =>
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
