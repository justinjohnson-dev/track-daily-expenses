import { useQuery } from 'react-query';

export default function useExpenseCategoryAmountQueryByMonth(
  userId: string,
  month: number,
) {
  return useQuery(
    ['expenseAmountsByMonth', month],
    () =>
      fetch(`/api/expenses/${userId}/${month}/amount`).then((res) =>
        res.json(),
      ),
    { refetchOnMount: true, refetchOnWindowFocus: true },
  );
}
