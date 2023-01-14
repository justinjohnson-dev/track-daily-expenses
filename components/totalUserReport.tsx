import CircularIndeterminate from '../components/circularLoadingBar';
import useTotalReportQuery from '../hooks/use-total-query';

import { useSession } from 'next-auth/react';

export default function TotalUserReport() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: totalReports, isLoading: isLoadingTotalReports } =
    useTotalReportQuery(status === 'authenticated' ? session.user.id : '');

  return (
    <div
      style={{
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      {isLoadingTotalReports && (
        <>
          <CircularIndeterminate />
        </>
      )}
      {!isLoadingTotalReports && (
        <>
          <p>
            <span style={{ fontWeight: 'bold' }}>Expense Total:</span> $
            {totalReports.sumOfExpense}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Income Total:</span> $
            {totalReports.sumOfIncome}
          </p>
        </>
      )}
    </div>
  );
}
