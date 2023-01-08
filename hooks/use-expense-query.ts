import { useQuery } from 'react-query';

export default function useExpenseQuery(month: number) {
  return useQuery(
    ['expenses', month],
    () => fetch(`/api/expenses/${month}`).then((res) => res.json()),
    { enabled: !!month }
  );
}
