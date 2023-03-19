/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import useExpenseMutation from '../../hooks/expense/use-expense-mutation';
import { useSession } from 'next-auth/react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button,
} from '@mui/material';

interface ExpenseState {
  expense: string;
  expenseAmount: string;
  expenseCategory: string;
}

const LIST_OF_EXPENSE_CATEGORIES: string[] = [
  'Utility',
  'Rent',
  'Groceries',
  'Restaurant',
  'Loan',
  'Entertainment',
  'Medical Bill',
  'Gas',
  'Wellness',
  'Insurance',
  'Shopping',
  'Shopping Necessities',
  'Phone',
  'Vacation',
  'Travel',
];

export default function expenseForm() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth

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
        expenseMonth: new Date().getMonth() + 1,
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
      <FormControl fullWidth style={{ margin: '1%', width: '100%' }}>
        <InputLabel id='demo-simple-select-label'>Expense Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={expenseForm.expenseCategory}
          label='Age'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setExpenseForm({
              ...expenseForm,
              expenseCategory: event.target.value,
            });
          }}
        >
          {LIST_OF_EXPENSE_CATEGORIES.map((expense: string, index: number) => {
            return (
              <MenuItem key={index} value={expense}>
                {expense}
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
        onClick={onSubmitExpense}
      >
        Submit
      </Button>
    </>
  );
}
