import React from 'react';
import ReactEcharts from 'echarts-for-react';
import CircularIndeterminate from '../circularLoadingBar';

interface expenseCategoryProps {
  isLoadingExpenses: boolean;
  expenseCategories: [object];
}

export default function PieChart({
  isLoadingExpenses,
  expenseCategories,
}: expenseCategoryProps) {
  if (isLoadingExpenses) {
    return <CircularIndeterminate />;
  } else if (!isLoadingExpenses && Object.keys(expenseCategories).length) {
    console.log(expenseCategories);

    // testing this should be moved to backend and separate component
    const pieChartValues = [];
    expenseCategories.map((expense: object, index: number) => {
      pieChartValues.push({
        value: expense['_count']['expenseCategory'],
        name: expense['expenseCategory'],
      });
    });
    pieChartValues.pop();

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
        <h3>Top 4 Expense Categories</h3>
        <ReactEcharts option={option} />
      </div>
    );
  } else {
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
}
