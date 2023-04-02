/* eslint-disable @next/next/no-html-link-for-pages */
import ExpenseForm from '../components/expense/expenseForm';
import IncomeForm from '../components/income/incomeForm';

import Layout from '../components/layout';
import React from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@mui/material';

const Home = () => {
  const { user, error, isLoading } = useUser();

  // will make this better later
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <Layout user={user}>
        <div
          style={{
            width: '100%',
            height: '100vh',
            border: 'solid 1px #eee',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Button
            style={{ borderColor: '#eee', margin: 'auto' }}
            variant='outlined'
          >
            <a
              style={{ textDecoration: 'none', color: 'black' }}
              href='/api/auth/login'
            >
              Please Login to use the application
            </a>
          </Button>
        </div>
      </Layout>
    );
  }

  if (user) {
    return (
      <Layout user={user}>
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
};

// fast/cached SSR page
export default Home;
