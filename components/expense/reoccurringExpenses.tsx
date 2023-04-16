import React, { useState } from 'react';
import { Button } from '@mui/material';
import FullScreenReoccuringExpensesModal from './modals/editReoccuringExpensesModal';

export default function ReOccurringExpenses() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const updateModalStatus = (value: boolean) => {
    setIsModalActive(value);
  };

  return (
    <>
      <Button
        variant='outlined'
        onClick={() => setIsModalActive(!isModalActive)}
      >
        Enable Reoccurring Expenses
      </Button>

      {isModalActive === true && (
        <FullScreenReoccuringExpensesModal
          isModalActive={isModalActive}
          updateModalStatus={updateModalStatus}
        />
      )}
    </>
  );
}
