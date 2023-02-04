import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import useIncomeMutation from '../../hooks/use-income-mutation';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button,
} from '@mui/material';

interface IncomeState {
  incomeName: string;
  incomeAmount: string;
  incomeCategory: string;
}

const LIST_OF_INCOME_CATEGORIES: string[] = ['Paycheck', 'Refund', 'Gift'];

export default function IncomeForm() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth

  const incomeMutation = useIncomeMutation();

  const [incomeForm, setIncomeForm] = useState<IncomeState>({
    incomeName: '',
    incomeAmount: '',
    incomeCategory: '',
  });

  const clearIncomeForm = () => {
    setIncomeForm({
      incomeName: '',
      incomeAmount: '',
      incomeCategory: '',
    });
  };

  const onSubmitIncom = async () => {
    try {
      const income = {
        incomeName: incomeForm.incomeName,
        incomeAmount: Number(incomeForm.incomeAmount),
        incomeCategory: incomeForm.incomeCategory,
        incomeDate: new Date().toLocaleString('en-US', {
          timeZone: 'CST',
          dateStyle: 'full',
          timeStyle: 'full',
        }),
        incomeMonth: new Date().getMonth() + 1,
        userId: session?.user?.id,
      };

      await incomeMutation.mutateAsync(income);
      clearIncomeForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p
        style={{
          padding: '5px',
        }}
      >
        <code
          style={{
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Incoming expenses
        </code>
      </p>
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense'
        placeholder='Paycheck'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setIncomeForm({
            ...incomeForm,
            incomeName: event.target.value,
          });
        }}
        value={incomeForm.incomeName}
      />
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense Amount'
        placeholder='999.99'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setIncomeForm({
            ...incomeForm,
            incomeAmount: event.target.value,
          });
        }}
        value={incomeForm.incomeAmount}
      />
      <FormControl fullWidth style={{ margin: '1%', width: '100%' }}>
        <InputLabel id='demo-simple-select-label'>Income Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={incomeForm.incomeCategory}
          label='Age'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIncomeForm({
              ...incomeForm,
              incomeCategory: event.target.value,
            });
          }}
        >
          {LIST_OF_INCOME_CATEGORIES.map((income: string, index: number) => {
            return (
              <MenuItem key={index} value={income}>
                {income}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        variant='outlined'
        style={{
          marginTop: '5px',
          float: 'right',
        }}
        onClick={onSubmitIncom}
      >
        Submit
      </Button>
    </>
  );
}
