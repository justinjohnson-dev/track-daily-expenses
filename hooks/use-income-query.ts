import { useQuery } from 'react-query';

export default function useIncomeQuery() {
  return useQuery('income', () =>
    fetch('/api/income').then((res) => res.json())
  );
}
