/* eslint-disable react-hooks/rules-of-hooks */
import useIncomeQuery from '../../hooks/use-income-query';
import { reverseMonthLookup } from '../../lib/month-lookup';
import CircularIndeterminate from '../circularLoadingBar';
import IncomeTableItems from './incomeTableItems';

type incomeTableProps = {
  month: number;
};

export default function IncomeTable({ month }: incomeTableProps) {
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery(month);

  if (isLoadingIncome) {
    return <CircularIndeterminate />;
  } else if (!isLoadingIncome && income.data.length > 0) {
    return (
      <>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5%',
            }}
          >
            <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
              Number of transactions:
              {income.data !== undefined && income.data.length}
            </code>
            <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
              {reverseMonthLookup[month]} Income: $
              {Math.round(income.runningSum * 100) / 100}
            </code>
          </div>
          <table
            style={{
              borderCollapse: 'collapse',
              margin: '25px 0',
              fontSize: '0.9em',
              fontFamily: 'sans-serif',
              minWidth: '400px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#009879',
                  color: '#ffffff',
                  textAlign: 'left',
                }}
              >
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Expense
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingIncome &&
                income.data !== undefined &&
                income.data.map((income: any, index: number) => {
                  return <IncomeTableItems key={index} data={income} />;
                })}
            </tbody>
          </table>{' '}
        </div>
      </>
    );
  } else {
    return (
      <div style={{ width: '100%' }}>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          No Income Data!
        </h3>
      </div>
    );
  }
}
