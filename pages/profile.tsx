import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import TotalUserReport from '../components/totalUserReport';
import { useRouter } from 'next/router';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Chart from '../components/charts/chart';

const ProfilePage = ({ user }: any) => {
  // month selector could be put into custom component as it is used more than once
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState<number>(currentMonth);
  const [dateRangeSelector, setDateRangeSelector] =
    useState<string>('All Time');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(event.target.value, 10));
  };

  return (
    <Layout user={user}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2% 5% 0 5%',
          }}
        >
          <h1>Profile Info</h1>
          <p>
            <span style={{ fontWeight: 'bold' }}>Username: </span>
            {user.name}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Nickname: </span>
            {user.nickname}
          </p>
        </div>

        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 5% 1% 5%',
          }}
        >
          <h2>Total User Report</h2>
          <TotalUserReport />
        </div>

        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 5%',
          }}
        >
          <h2>Categories</h2>
          <FormControl fullWidth style={{ width: '100%' }}>
            <InputLabel id='demo-simple-select-label'>Date Range</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={dateRangeSelector}
              label='dateRange'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDateRangeSelector(event.target.value);
              }}
            >
              <MenuItem value={'All Time'}>All Time</MenuItem>
              <MenuItem value={'Month'}>Month</MenuItem>
            </Select>
          </FormControl>
          {dateRangeSelector === 'Month' && (
            <Box sx={{ width: '100%', margin: '5% 0' }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Month</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={month.toString()}
                  label='Month'
                  onChange={handleChange}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          <Chart user={user} dateRange={dateRangeSelector} month={month} />
        </div>
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
