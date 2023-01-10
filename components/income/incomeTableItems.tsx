import React from 'react';

interface IncomeProps {
  data: {
    incomeName: string;
    incomeAmount: number;
    incomeCategory: string;
    incomeDate: string;
  };
}

export default function IncomeTableItems({
  data: { incomeName, incomeAmount, incomeCategory, incomeDate },
}: IncomeProps) {
  const dateCutoffValue = incomeDate.indexOf(' at '); // space between at to avoid 'at' in 'Saturday'
  const stringDateToConvert = incomeDate.substring(0, dateCutoffValue);
  return (
    <tr
      style={{
        borderBottom: '1px solid #dddddd',
      }}
    >
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {incomeName}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {incomeAmount}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {incomeCategory}
      </td>
      <td
        style={{
          padding: '12px 15px',
        }}
      >
        {stringDateToConvert}
      </td>
    </tr>
  );
}
