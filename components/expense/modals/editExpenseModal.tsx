import * as React from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useEditExpenseMutation from '../../../hooks/expense/use-expense-edit';
import useReOccurringEditExpenseMutation from '../../../hooks/reoccurring_expense/use-reoccurring-expense-edit';
import useDeleteExpenseMutation from '../../../hooks/expense/use-expense-delete';
import useReOccurringDeleteExpenseMutation from '../../../hooks/reoccurring_expense/use-reoccurring-expense-delete';
import { useUser } from '@auth0/nextjs-auth0/client';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

interface FullScreenEditExpenseModalProps {
  isEditModalActive: boolean;
  updateModalStatus: any;
  expense: {
    id: string;
    expense: string;
    expenseAmount: number;
    expenseCategory: string;
    expenseDate: string;
  };
  refetch: any;
  expense_api: string;
}

export default function FullScreenEditExpenseModal({
  expense,
  updateModalStatus,
  isEditModalActive,
  refetch,
  expense_api,
}: FullScreenEditExpenseModalProps) {
  const { user, error, isLoading } = useUser();
  const editExpenseMutation = useEditExpenseMutation();
  const editReOccurringExpenseMutation = useReOccurringEditExpenseMutation();
  const deleteExpenseMutation = useDeleteExpenseMutation(user.sub);
  const deleteReOccurringExpenseMutation = useReOccurringDeleteExpenseMutation(
    user.sub,
  );

  const handleClose = () => {
    updateModalStatus(false);
  };

  const [inEditProgressExpense, setInEditProgressExpense] =
    React.useState(expense);

  const onSubmitUpdate = async () => {
    const response = await editExpenseMutation.mutateAsync(
      inEditProgressExpense,
    );

    if (response) handleClose();
    updateModalStatus(false);
    refetch();
  };

  const onSubmitReOccurringUpdate = async () => {
    const response = await editReOccurringExpenseMutation.mutateAsync(
      inEditProgressExpense,
    );

    if (response) handleClose();
    updateModalStatus(false);
    refetch();
  };

  const onSubmitDelete = async () => {
    const response = await deleteExpenseMutation.mutateAsync(
      inEditProgressExpense,
    );

    if (response) handleClose();
    updateModalStatus(false);
    refetch();
  };

  const onSubmitReOccuringDelete = async () => {
    const response = await deleteReOccurringExpenseMutation.mutateAsync(
      inEditProgressExpense,
    );

    if (response) handleClose();
    updateModalStatus(false);
    refetch();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isEditModalActive}
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
              Edit Expense {}
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: '85%',
            margin: '10% auto',
            marginRight: '10%',
            justifyContent: 'space-evenly',
          }}
        >
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
              Expense ID: {inEditProgressExpense.id}
            </code>
          </p>
          <TextField
            style={{ width: '100%' }}
            id='outlined-textarea'
            label='Expense'
            placeholder='Starbucks'
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
            placeholder='10.34'
            multiline
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInEditProgressExpense({
                ...inEditProgressExpense,
                expenseAmount: Number(event.target.value),
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
            label='Created Timestamp'
            placeholder='10.34'
            multiline
            disabled={true}
            value={inEditProgressExpense.expenseDate}
          />

          <Button
            variant='outlined'
            style={{
              marginTop: '2%',
              float: 'right',
            }}
            onClick={() => {
              if (expense_api === 'expense') onSubmitUpdate();
              else onSubmitReOccurringUpdate();
            }}
          >
            Update
          </Button>
          <Button
            variant='outlined'
            style={{
              marginTop: '2%',
              float: 'left',
            }}
            onClick={() => {
              if (expense_api === 'expense') onSubmitDelete();
              else onSubmitReOccuringDelete();
            }}
          >
            Delete
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
