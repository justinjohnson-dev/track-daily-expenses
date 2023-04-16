import React, { useState } from 'react';

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
import useDeleteExpenseMutation from '../../../hooks/expense/use-expense-delete';
import { useUser } from '@auth0/nextjs-auth0/client';
import DatePickerComponent from '../../mui/datePicker';

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
  const editExpenseMutation = useEditExpenseMutation();
  const deleteExpenseMutation = useDeleteExpenseMutation(user.sub);

  const handleClose = () => {
    updateModalStatus(false);
  };

  const [inEditProgressExpense, setInEditProgressExpense] = React.useState('');

  const onSubmitUpdate = async () => {
    // const response = await editExpenseMutation.mutateAsync(
    //   inEditProgressExpense,
    // );
    // if (response) handleClose();
    // updateModalStatus(false);
  };

  const onSubmitDelete = async () => {
    // const response = await deleteExpenseMutation.mutateAsync(
    //   inEditProgressExpense,
    // );
    // if (response) handleClose();
    // updateModalStatus(false);
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
            placeholder='Starbucks'
            multiline
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //   setInEditProgressExpense({
            //     ...inEditProgressExpense,
            //     expense: event.target.value,
            //   });
            // }}
            // value={inEditProgressExpense.expense}
          />
          <TextField
            style={{ marginTop: '5%', width: '100%' }}
            id='outlined-textarea'
            label='Expense Amount'
            placeholder='10.34'
            multiline
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //   setInEditProgressExpense({
            //     ...inEditProgressExpense,
            //     expenseAmount: Number(event.target.value),
            //   });
            // }}
            // value={inEditProgressExpense.expenseAmount}
          />
          <TextField
            style={{ marginTop: '5%', width: '100%' }}
            id='outlined-textarea'
            label='Date Expense Comes Out'
            placeholder='10.34'
            multiline
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //   setInEditProgressExpense({
            //     ...inEditProgressExpense,
            //     expenseAmount: Number(event.target.value),
            //   });
            // }}
            // value={inEditProgressExpense.expenseAmount}
          />
          <br />
          <br />
          <br />
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
            <tbody></tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
