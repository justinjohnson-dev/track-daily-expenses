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
  expense: any;
}

export default function FullScreenEditExpenseModal({
  expense,
  updateModalStatus,
  isEditModalActive,
}: FullScreenEditExpenseModalProps) {
  const handleClose = () => {
    updateModalStatus(false);
  };

  const [inEditProgressExpense, setInEditProgressExpense] =
    React.useState(expense);

  // TODO: IF TABLE HAS BEEN FILTERED OR SORTED - MODAL IS
  // GRABBING THE WRONG ID
  const onSumbitUpdate = () => {
    console.log('updating');
    console.log(inEditProgressExpense);
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
            {/* <Button autoFocus color='inherit' onClick={handleClose}> */}
            {/* <span style={{ fontSize: '20px' }}>Delete</span>{' '} */}

            {/* </Button> */}
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
            onClick={onSumbitUpdate}
          >
            Update
          </Button>
          <Button
            variant='outlined'
            style={{
              marginTop: '2%',
              float: 'left',
            }}
            // onClick={onSubmitExpense}
          >
            Delete
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
