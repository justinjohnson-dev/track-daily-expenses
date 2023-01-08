import { useQuery } from 'react-query';

export default function useIncomeQuery(month: number) {
  return useQuery(
    ['income', month],
    () => fetch(`/api/income/${month}`).then((res) => res.json()),
    { enabled: !!month }
  );
}
