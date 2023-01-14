import { useQuery } from 'react-query';

export default function useTotalReportQuery(userId: string) {
  return useQuery(
    ['totals', userId],
    () => fetch(`/api/totals/${userId}`).then((res) => res.json()),
    { enabled: !!userId }
  );
}
