import React, { useState } from 'react';

import useIncomeMutation from '../../hooks/use-income-mutation';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useSession } from 'next-auth/react';

interface IncomeState {
  incomeName: string;
  incomeAmount: string;
  incomeCategory: string;
}

export default function IncomeForm() {
  const { data: session, status } = useSession();

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
        userId: session.user.id,
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
        placeholder='3050.75'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setIncomeForm({
            ...incomeForm,
            incomeAmount: event.target.value,
          });
        }}
        value={incomeForm.incomeAmount}
      />
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense Category'
        placeholder='Income'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setIncomeForm({
            ...incomeForm,
            incomeCategory: event.target.value,
          });
        }}
        value={incomeForm.incomeCategory}
      />
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
