import { useQuery } from 'react-query';

export default function useExpenseQuery(userId: string, month: number) {
  return useQuery(
    ['expensesByMonth', month],
    () => fetch(`/api/expenses/${userId}/${month}`).then((res) => res.json()),
    { enabled: !!month },
  );
}
