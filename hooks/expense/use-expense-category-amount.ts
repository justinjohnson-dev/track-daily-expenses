import { useQuery } from 'react-query';

export default function useExpenseCategoryAmountQuery(userId: string) {
  return useQuery(
    ['expenseAmounts', userId],
    () => fetch(`/api/expenses/${userId}/amount`).then((res) => res.json()),
    { enabled: !!userId }
  );
}
