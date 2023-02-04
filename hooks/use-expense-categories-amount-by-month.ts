import { useQuery } from 'react-query';

export default function useExpenseCategoryAmountQueryByMonth(
  userId: string,
  month: number
) {
  return useQuery(
    ['expenseAmounts', userId],
    () =>
      fetch(`/api/expenses/${userId}/${month}/amount`).then((res) =>
        res.json()
      ),
    { enabled: !!userId }
  );
}
