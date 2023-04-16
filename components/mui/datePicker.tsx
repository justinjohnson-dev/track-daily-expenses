import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DatePickerProps {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
}

export default function ControlledComponent({
  value,
  setValue,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DatePicker
          label='Expense Date'
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
