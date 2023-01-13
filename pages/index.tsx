import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import ExpenseForm from '../components/expense/expenseForm';
import IncomeForm from '../components/income/incomeForm';

import Layout from '../components/layout';
import React from 'react';

export default function Home() {
  return (
    <Layout>
      <div
        style={{
          width: '90%',
          margin: '25px auto 65px auto',
        }}
      >
        <ExpenseForm />
      </div>
      <div
        style={{
          width: '90%',
          margin: '50px auto',
        }}
      >
        <IncomeForm />
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
