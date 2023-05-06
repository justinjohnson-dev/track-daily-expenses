import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useReOccurringExpenseMutation from '../../../hooks/reoccurring_expense/use-reoccurring-expense-mutation';
import useReOccurringExpenseQuery from '../../../hooks/reoccurring_expense/use-reoccurring-expense-query';
import { useUser } from '@auth0/nextjs-auth0/client';
import ExpenseTableItems from '../expenseTableItems';

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
  'Subscription',
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

interface FullScreenEditExpenseModalProps {
  isModalActive: boolean;
  updateModalStatus: any;
}

export default function FullScreenReoccuringExpensesModal({
  updateModalStatus,
  isModalActive,
}: FullScreenEditExpenseModalProps) {
  const { user, error, isLoading } = useUser();
  const {
    data: reOccurringExpenses,
    isLoading: isLoadingExpenses,
    refetch,
  } = useReOccurringExpenseQuery(user.sub, new Date().getMonth() + 1);

  const reOccurringExpenseMutation = useReOccurringExpenseMutation();

  const [inEditProgressExpense, setInEditProgressExpense] = useState({
    expense: '',
    expenseAmount: '',
    expenseCategory: '',
    expenseDate: '',
  });

  const handleClose = () => {
    updateModalStatus(false);
  };

  const clearExpenseForm = () => {
    setInEditProgressExpense({
      expense: '',
      expenseAmount: '',
      expenseCategory: '',
      expenseDate: '',
    });
  };

  const onSubmitExpense = async () => {
    const expenseData = {
      expense: inEditProgressExpense.expense,
      expenseAmount: Number(inEditProgressExpense.expenseAmount),
      expenseCategory: inEditProgressExpense.expenseCategory,
      expenseDate: new Date(
        `${new Date().getMonth() + 1}/${
          inEditProgressExpense.expenseDate
        }/${new Date().getFullYear()}`,
      ).toLocaleString('en-US', {
        timeZone: 'CST',
        dateStyle: 'full',
        timeStyle: 'full',
      }),
      expenseMonth: new Date().getMonth() + 1,
      userId: user.sub,
      isReoccurringExpense: true,
    };

    console.log(expenseData);

    await reOccurringExpenseMutation.mutateAsync(expenseData);
    clearExpenseForm();
    refetch();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isModalActive}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: 'relative',
            backgroundColor: '#009879',
            color: 'white',
          }}
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Reoccurring Expenses
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: '85%',
            margin: '1rem auto',
            justifyContent: 'space-evenly',
          }}
        >
          <p
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#009879',
              marginBottom: '1rem',
            }}
          >
            Add New Reoccuring Expenses
          </p>
          <TextField
            style={{ width: '100%' }}
            id='outlined-textarea'
            label='Expense'
            placeholder='Rent'
            multiline
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInEditProgressExpense({
                ...inEditProgressExpense,
                expense: event.target.value,
              });
            }}
            value={inEditProgressExpense.expense}
          />
          <TextField
            style={{ marginTop: '5%', width: '100%' }}
            id='outlined-textarea'
            label='Expense Amount'
            multiline
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInEditProgressExpense({
                ...inEditProgressExpense,
                expenseAmount: event.target.value,
              });
            }}
            value={inEditProgressExpense.expenseAmount}
          />
          <FormControl fullWidth style={{ marginTop: '5%', width: '100%' }}>
            <InputLabel id='demo-simple-select-label'>
              Expense Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={inEditProgressExpense.expenseCategory}
              label='ExpenseCategory'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInEditProgressExpense({
                  ...inEditProgressExpense,
                  expenseCategory: event.target.value,
                });
              }}
            >
              {LIST_OF_EXPENSE_CATEGORIES.map(
                (expense: string, index: number) => {
                  return (
                    <MenuItem key={index} value={expense}>
                      {expense}
                    </MenuItem>
                  );
                },
              )}
            </Select>
          </FormControl>
          <TextField
            style={{ marginTop: '5%', width: '100%' }}
            id='outlined-textarea'
            label='Day of the month expense is due'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInEditProgressExpense({
                ...inEditProgressExpense,
                expenseDate: event.target.value,
              });
            }}
            value={inEditProgressExpense.expenseDate}
          />
          <Button
            variant='outlined'
            style={{ margin: '1rem 0', float: 'right' }}
            onClick={onSubmitExpense}
          >
            Add Expense
          </Button>

          <table
            style={{
              margin: '0 auto',
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9em',
              fontFamily: 'sans-serif',
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
                  <span>Amount </span>
                </th>
                <th
                  style={{
                    padding: '12px 15px',
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingExpenses &&
                reOccurringExpenses.data.map((expense: any, index: number) => {
                  return (
                    <ExpenseTableItems
                      key={index}
                      data={expense}
                      refetch={refetch}
                      expense_api={'reoccurring'}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
