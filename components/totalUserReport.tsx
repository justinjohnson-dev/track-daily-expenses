/* eslint-disable react-hooks/rules-of-hooks */
import CircularIndeterminate from '../components/circularLoadingBar';
import useTotalReportQuery from '../hooks/use-total-query';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function TotalUserReport() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const { data: totalReports, isLoading: isLoadingTotalReports } =
    useTotalReportQuery(user.sub);

  return (
    <>
      {isLoadingTotalReports && (
        <>
          <CircularIndeterminate />
        </>
      )}
      {!isLoadingTotalReports && (
        <div>
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
                width: '135px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}># Transactions</span>{' '}
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
                width: '135px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}># Transactions</span>{' '}
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
                totalReports['expense']['totalAmount'],
            )}
          </p>
        </div>
      )}
    </>
  );
}
