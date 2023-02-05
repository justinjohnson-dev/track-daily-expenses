import CircularIndeterminate from '../components/circularLoadingBar';
import useTotalReportQuery from '../hooks/use-total-query';

import { useSession } from 'next-auth/react';

export default function TotalUserReport() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: totalReports, isLoading: isLoadingTotalReports } =
    useTotalReportQuery(status === 'authenticated' ? session.user.id : '');

  return (
    <>
      {isLoadingTotalReports && (
        <>
          <CircularIndeterminate />
        </>
      )}
      {!isLoadingTotalReports && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Expense Total:</span> $
              {totalReports['expense']['totalAmount']}
            </p>
            <p
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Transaction Total</span>{' '}
              {totalReports['expense']['numberOfTransactions']}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Income Total:</span> $
              {totalReports['income']['totalAmount']}
            </p>
            <p
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Transaction Total</span>{' '}
              {totalReports['income']['numberOfTransactions']}
            </p>
          </div>
          <p
            style={{
              padding: 0,
              marginTop: '5%',
            }}
          >
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
              Total Income to Expense:
            </span>
            $
            {Math.round(
              totalReports['income']['totalAmount'] -
                totalReports['expense']['totalAmount']
            )}
          </p>
        </div>
      )}
    </>
  );
}
