import React, { useEffect } from 'react';
import CircularIndeterminate from '../circularLoadingBar';
import { useQuery } from 'react-query';

import useExpenseCategoryQuery from '../../hooks/expense/use-expense-categories-query';
import PieChart from './pieChart';

export default function Chart({ user, dateRange, month }) {
  // putting query in component so it updates on window focus and remount properly
  const {
    data: expenseCategoriesForGivenMonth,
    isLoading: isLoadingExpensesByMonth,
  } = useQuery(
    ['expenseAmountsByMonth', month],
    () =>
      fetch(`/api/expenses/${user.sub}/${month}/labels`).then((res) =>
        res.json(),
      ),
    { refetchOnMount: true, refetchOnWindowFocus: true },
  );

  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(user.sub);

  if (dateRange === 'Month') {
    if (isLoadingExpensesByMonth) {
      return <CircularIndeterminate />;
    }

    if (expenseCategoriesForGivenMonth.length === 0) {
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

    return (
      <PieChart
        categories={expenseCategoriesForGivenMonth}
        dateRange={dateRange}
        month={month}
      />
    );
  }

  if (dateRange === 'All Time') {
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

    return (
      <PieChart
        categories={expenseCategories}
        dateRange={dateRange}
        month={month}
      />
    );
  }
}
