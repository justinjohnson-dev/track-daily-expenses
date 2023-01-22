import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import Layout from '../components/layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import TotalUserReport from '../components/totalUserReport';
import ExpenseCategories from '../components/expense/expenseCategories';
import useExpenseCategoryQuery from '../hooks/use-expense-categories-query';
import useExpenseCategoryAmountQuery from '../hooks/use-expense-category-amount';

export default function Home() {
  const { data: session, status } = useSession() as any; // temp resolving user?.id missed type from nextauth
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(
      status === 'authenticated' ? session?.user?.id : ''
    );
  const { data: expenseAmounts, isLoading: isLoadingExpenseAmounts } =
    useExpenseCategoryAmountQuery(
      status === 'authenticated' ? session?.user?.id : ''
    );
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5% 5% 1% 5%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Username: </span>
          {status === 'authenticated' ? session?.user?.username : 'no user yet'}
        </p>
        <p
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 0 0 5%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Email: </span>
          {status === 'authenticated' ? session?.user?.email : 'no user yet'}
        </p>
        <TotalUserReport />
        <ExpenseCategories
          isLoadingExpenses={isLoadingExpenses}
          expenseCategories={expenseCategories}
        />
        <ExpenseCategories
          isLoadingExpenses={isLoadingExpenseAmounts}
          expenseCategories={expenseAmounts}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
