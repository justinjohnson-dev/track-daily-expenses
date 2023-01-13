/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import useExpenseMutation from '../../hooks/use-expense-mutation';
import { useSession } from 'next-auth/react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface ExpenseState {
  expense: string;
  expenseAmount: string;
  expenseCategory: string;
}

export default function expenseForm() {
  const { data: session, status } = useSession();

  const expenseMutation = useExpenseMutation();
  const [expenseForm, setExpenseForm] = useState<ExpenseState>({
    expense: '',
    expenseAmount: '',
    expenseCategory: '',
  });

  const clearExpenseForm = () => {
    setExpenseForm({
      expense: '',
      expenseAmount: '',
      expenseCategory: '',
    });
  };

  const onSubmitExpense = async () => {
    try {
      const expense = {
        expense: expenseForm.expense,
        expenseAmount: Number(expenseForm.expenseAmount),
        expenseCategory: expenseForm.expenseCategory,
        expenseDate: new Date().toLocaleString('en-US', {
          timeZone: 'CST',
          dateStyle: 'full',
          timeStyle: 'full',
        }),
        userId: session?.user?.id,
      };

      await expenseMutation.mutateAsync(expense);
      clearExpenseForm();
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
          Outgoing expenses
        </code>
      </p>
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense'
        placeholder='Starbucks'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setExpenseForm({
            ...expenseForm,
            expense: event.target.value,
          });
        }}
        value={expenseForm.expense}
      />
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense Amount'
        placeholder='10.34'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setExpenseForm({
            ...expenseForm,
            expenseAmount: event.target.value,
          });
        }}
        value={expenseForm.expenseAmount}
      />
      <TextField
        style={{ margin: '1%', width: '100%' }}
        id='outlined-textarea'
        label='Expense Category'
        placeholder='Food'
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setExpenseForm({
            ...expenseForm,
            expenseCategory: event.target.value,
          });
        }}
        value={expenseForm.expenseCategory}
      />
      <Button
        variant='outlined'
        style={{
          marginTop: '5px',
          float: 'right',
        }}
        onClick={onSubmitExpense}
      >
        Submit
      </Button>
    </>
  );
}
