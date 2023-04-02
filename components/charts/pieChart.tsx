import React from 'react';
import ReactEcharts from 'echarts-for-react';
import CircularIndeterminate from '../circularLoadingBar';

import useExpenseCategoryQuery from '../../hooks/expense/use-expense-categories-query';
import useExpenseCategoryQueryByMonth from '../../hooks/expense/use-expense-categories-query-by-month';
// import useExpenseCategoryAmountQuery from '../../hooks/expense/use-expense-category-amount';

interface expenseCategoryProps {
  isLoadingExpenses: boolean;
  expenseCategories: [object];
}

export default function PieChart({ user }: any, dateRange: any) {
  console.log(dateRange);
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(user.sub);

  const {
    data: expenseCategoriesForGivenMonth,
    isLoading: isLoadingExpensesByMonth,
  } = useExpenseCategoryQueryByMonth(user.sub, 3);

  // const { data: expenseAmounts, isLoading: isLoadingExpenseAmounts } =
  //   useExpenseCategoryAmountQuery(user.sub);

  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  }

  if (expenseCategories.length === 0) {
    return (
      <div style={{ width: '100%' }}>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          No expense categories
        </h3>
      </div>
    );
  }

  console.log(expenseCategories);
  if (expenseCategories) {
    // testing this should be moved to backend and separate component
    const pieChartValues = [];
    expenseCategories.map((expense: object, index: number) => {
      pieChartValues.push({
        value: expense['_count']['expenseCategory'],
        name: expense['expenseCategory'],
      });
    });

    const option = {
      legend: {
        top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5,
          },
          data: pieChartValues,
        },
      ],
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Top Four Category Transactions</h3>
        <ReactEcharts option={option} />
      </div>
    );
  }
}
