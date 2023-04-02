import { useQuery } from 'react-query';

export default function useExpenseCategoryQueryByMonth(
  userId: string,
  month: number,
) {
  return useQuery(
    ['expensesCategoryLabelsByMonth', userId],
    () =>
      fetch(`/api/expenses/${userId}/${month}/labels`).then((res) =>
        res.json(),
      ),
    { refetchOnMount: true, refetchOnWindowFocus: true },
  );
}
