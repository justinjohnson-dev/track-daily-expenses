import { useEffect, useState } from 'react';

import useExpenseQuery from '../hooks/use-expense-query';
import useIncomeQuery from '../hooks/use-income-query';

import IncomeList from '../components/income/incomeList';
import ExpenseTable from '../components/expense/expenseTable';

import Layout from '../components/layout';

import { reverseMonthLookup } from '../lib/month-lookup';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Analytics() {
  const [month, setMonth] = useState<number>(1);
  const [currentExpenseSum, setCurrentExpenseSum] = useState<number>(0);
  const [currentIncomeSum, setCurrentIncomeSum] = useState<number>(0);
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery(month);
  const { data: expenses, isLoading: isLoadingExpenses } =
    useExpenseQuery(month);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (expenses) {
      const sumOfExpenses = expenses.reduce(function (
        runningSum: any,
        expense: { expenseAmount: any }
      ) {
        return runningSum + expense.expenseAmount;
      },
      0);
      setCurrentExpenseSum(sumOfExpenses);
    }
  }, [expenses, currentExpenseSum]);

  useEffect(() => {
    if (income) {
      const sumOfIncome = income.reduce(function (
        runningSum: any,
        incomeEntry: { incomeAmount: any }
      ) {
        return runningSum + incomeEntry.incomeAmount;
      },
      0);
      setCurrentIncomeSum(sumOfIncome);
    }
  }, [income, currentIncomeSum]);
  return (
    <>
      <Layout />
      <Box sx={{ width: '90%', margin: '1rem auto' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Month</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={month.toString()}
            label='Month'
            onChange={handleChange}
          >
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%' }}
      >
        <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
          {reverseMonthLookup[month]} Spending: $
          {Math.round(currentExpenseSum * 100) / 100}
        </code>
        <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Number of transactions:
          {expenses !== undefined && expenses.length}
        </code>
      </div>
      <div>
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
            {!isLoadingExpenses &&
              expenses !== undefined &&
              expenses.map((expense: any, index: number) => {
                return <ExpenseTable key={index} data={expense} />;
              })}
          </tbody>
        </table>{' '}
      </div>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
          {reverseMonthLookup[month]} Income: $
          {Math.round(currentIncomeSum * 100) / 100}
        </code>
        <code style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Number of transactions:
          {income !== undefined && income.length}
        </code>
      </div>
      <div>
        {' '}
        {!isLoadingIncome &&
          income !== undefined &&
          income.map((incomeEntry: any, index: number) => {
            return <IncomeList key={index} data={incomeEntry} />;
          })}
      </div>
    </>
  );
}
