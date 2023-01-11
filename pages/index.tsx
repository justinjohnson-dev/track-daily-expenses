import ExpenseForm from '../components/expense/expenseForm';
import IncomeForm from '../components/income/incomeForm';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Layout from '../components/layout';

export default function Home() {
  // const { data: session, status } = useSession({
  //   required: true,
  // });

  // console.log(session);
  // console.log(status);

  // if (!session) {
  //   return <div>not authenticated</div>;
  // }

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

  console.log(session);

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
