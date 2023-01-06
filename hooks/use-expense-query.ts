import { useQuery } from 'react-query';

export default function useExpenseQuery() {
  return useQuery('expenses', () =>
    fetch('/api/expenses').then((res) => res.json())
  );
}
