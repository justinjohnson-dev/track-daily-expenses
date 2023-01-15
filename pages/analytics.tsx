import { useState } from 'react';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ExpenseTable from '../components/expense/expenseTable';
import IncomeTable from '../components/income/incomeTable';

import useIncomeQuery from '../hooks/use-income-query';
import Layout from '../components/layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import ExpenseCategories from '../components/expense/expenseCategories';
import TotalUserReport from '../components/totalUserReport';

export default function Analytics() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState<number>(currentMonth);
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery(
    status === 'authenticated' ? session.user.id : '',
    month
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(event.target.value, 10));
  };

  const expenseTableProps = {
    month: month,
    currentIncomeSum: isLoadingIncome ? 0 : income.runningSum,
  };

  const incomeTableProps = {
    income,
    isLoadingIncome,
    month,
  };

  return (
    <Layout>
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
      <ExpenseTable {...expenseTableProps} />
      <hr />
      <IncomeTable {...incomeTableProps} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
