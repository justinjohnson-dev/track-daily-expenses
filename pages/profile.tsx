import Layout from '../components/layout';
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import TotalUserReport from '../components/totalUserReport';
import ExpenseCategories from '../components/expense/expenseCategories';
import useExpenseCategoryQuery from '../hooks/expense/use-expense-categories-query';
import useExpenseCategoryAmountQuery from '../hooks/expense/use-expense-category-amount';
import { useRouter } from 'next/router';

import PieChart from '../components/charts/pieChart';

const ProfilePage = ({ user }: any) => {
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategoryQuery(user.sub);
  const { data: expenseAmounts, isLoading: isLoadingExpenseAmounts } =
    useExpenseCategoryAmountQuery(user.sub);
  return (
    <Layout user={user}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5% 5% 1% 5%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Username: </span>
          {user.name}
        </p>
        <p
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 0 0 5%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Nickname: </span>
          {user.nickname}
        </p>
        <TotalUserReport />

        {/* <ExpenseCategories
          isLoadingExpenses={isLoadingExpenses}
          expenseCategories={expenseCategories}
        /> */}

        <PieChart
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
};

const Profile = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/api/auth/login');
    }
  }, [user, router]);

  // will make this better later
  // if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    return <ProfilePage user={user} />;
  }
};

export default Profile;
