import React from 'react';
import CircularIndeterminate from '../circularLoadingBar';
import { useQuery } from 'react-query';
import ApiService from '../../services/api/apiService';
import useExpenseCategoryQuery from '../../hooks/expense/use-expense-categories-query';
import PieChart from './pieChart';

interface User {
  sub: string;
}

interface ChartProps {
  user: User;
  dateRange: 'Month' | 'All Time';
  month: string;
}

export default function Chart({ user, dateRange, month }: ChartProps) {
  const {
    data: expenseCategoriesForGivenMonth,
    isLoading: isLoadingExpensesByMonth,
  } = useQuery(
    ['expenseAmountsByMonth', month],
    () => ApiService.fetchExpensesByMonth(user.sub, month),
    { refetchOnMount: true, refetchOnWindowFocus: true },
  );

  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(user.sub);

  if (dateRange === 'Month') {
    if (isLoadingExpensesByMonth) {
      return <CircularIndeterminate />;
    }

    if (expenseCategoriesForGivenMonth.length === 0) {
      return <NoCategories />;
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
      return <NoCategories />;
    }

    return (
      <PieChart
        categories={expenseCategories}
        dateRange={dateRange}
        month={month}
      />
    );
  }

  function NoCategories() {
    return (
      <div style={{ width: '100%' }}>
        <h3 style={{ textAlign: 'center' }}>No expense categories</h3>
      </div>
    );
  }
}
