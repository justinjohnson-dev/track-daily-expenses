import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ExpenseTable from '../components/expense/expenseTable';
import IncomeTable from '../components/income/incomeTable';

import useIncomeQuery from '../hooks/income/use-income-query';
import Layout from '../components/layout';
import React from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { TextField } from '@mui/material';

const AnalyticsComponent = ({ user }: any) => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState<number>(currentMonth);
  const [searchTransaction, setSearchTransaction] = useState<string>('');
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery(
    user.sub,
    month,
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(event.target.value, 10));
  };

  const expenseTableProps = {
    sub: user.sub,
    month: month,
    currentIncomeSum: isLoadingIncome ? 0 : income.runningSum,
    filterValue: searchTransaction,
  };

  const incomeTableProps = {
    income,
    isLoadingIncome,
    month,
  };

  return (
    <Layout user={user}>
      <Box sx={{ width: '90%', margin: '8% auto 5% auto' }}>
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
      <TextField
        style={{
          display: 'flex',
          width: '90%',
          margin: 'auto',
          paddingBottom: '1rem',
        }}
        id='outlined-textarea'
        label='Search Transaction'
        placeholder='Amazon'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTransaction(event.target.value);
        }}
        value={searchTransaction}
      />
      <ExpenseTable {...expenseTableProps} />
      <hr />
      <IncomeTable {...incomeTableProps} />
    </Layout>
  );
};

const Analytics = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/api/auth/login');
    }
  }, [user, router]);

  if (user) {
    return <AnalyticsComponent user={user} />;
  }
};

export default Analytics;
