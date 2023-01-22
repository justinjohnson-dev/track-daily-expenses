import { useQuery } from 'react-query';

export default function useExpenseCategoryQuery(userId: string) {
  return useQuery(
    ['expensesCategoryLabels', userId],
    () => fetch(`/api/expenses/${userId}/labels`).then((res) => res.json()),
    { enabled: !!userId }
  );
}
