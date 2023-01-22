import React from 'react';

type categoryButtonProps = {
  category: string;
  categoryValue: number;
  categoryAmount: number;
};

export default function ExpenseCategoryButton({
  category,
  categoryValue,
  categoryAmount,
}: categoryButtonProps) {
  return (
    <button
      disabled={true}
      style={{
        backgroundColor: '#009879',
        color: '#ffffff',
        borderRadius: '25%',
        margin: '1%',
        height: '30px',
      }}
    >
      {category} {categoryValue} ${categoryAmount}
    </button>
  );
}
