import React from 'react';

interface IncomeProps {
  data: {
    id: string;
    incomeName: string;
    incomeAmount: number;
    incomeCategory: string;
    incomeDate: string;
  };
}

function IncomeList({
  data: { id, incomeName, incomeAmount, incomeCategory, incomeDate },
}: IncomeProps) {
  return (
    <div>
      <p>
        {incomeName}/{incomeAmount}/{incomeCategory}/{incomeDate}
      </p>
    </div>
  );
}

export default IncomeList;
