import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ExpenseTable from '../components/expense/expenseTable';
import IncomeTable from '../components/income/incomeTable';

import useIncomeQuery from '../hooks/use-income-query';

import { useSession } from 'next-auth/react';

export default function Analytics() {
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState<number>(currentMonth);
  const { data: income, isLoading: isLoadingIncome } = useIncomeQuery(month);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(event.target.value, 10));
  };

  const expenseTableProps = {
    month: month,
    currentIncomeSum: isLoadingIncome ? 0 : income.runningSum,
  };

  const incomeTableProps = {
    month: month,
  };

  return (
    <>
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
      <ExpenseTable {...expenseTableProps} />
      <hr />
      <IncomeTable {...incomeTableProps} />
    </>
  );
}
