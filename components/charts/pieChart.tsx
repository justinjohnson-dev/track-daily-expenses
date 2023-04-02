import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { reverseMonthLookup } from '../../lib/month-lookup';

export default function PieChart({ categories, dateRange, month }) {
  // testing this should be moved to backend and separate component
  const pieChartValues = [];
  categories.map((expense: object, index: number) => {
    pieChartValues.push({
      value: expense['_count']['expenseCategory'],
      name: expense['expenseCategory'],
    });
  });

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: 0,
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
      {dateRange == 'Month' ? (
        <h3>Top Four Category Transactions in {reverseMonthLookup[month]}</h3>
      ) : (
        <h3>Top Four Category Transactions All Time</h3>
      )}
      <ReactEcharts option={option} />
    </div>
  );
}
