import { useQuery } from 'react-query';

export default function useIncomeQuery(userId: string, month: number) {
  return useQuery(
    ['income', month],
    () => fetch(`/api/income/${userId}/${month}`).then((res) => res.json()),
    { enabled: !!month }
  );
}
