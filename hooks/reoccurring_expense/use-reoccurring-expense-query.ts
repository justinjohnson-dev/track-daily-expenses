import { useQuery } from 'react-query';

export default function useReOccurringExpenseQuery(
  userId: string,
  month: number,
) {
  return useQuery(
    ['reOccurringExpensesByMonth', month],
    () =>
      fetch(`/api/reoccurring_expenses/${userId}/${month}`).then((res) =>
        res.json(),
      ),
    { enabled: !!month },
  );
}
