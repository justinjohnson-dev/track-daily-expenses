import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Layout from '../components/layout';
import TotalUserReport from '../components/totalUserReport';
import Chart from '../components/charts/chart';

interface User {
  sub: string;
  name: string;
  nickname: string;
}

type ProfilePageProps = {
  user: User;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ALL_TIME = 'All Time';

const ProfilePage = ({ user }: ProfilePageProps) => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState<number>(currentMonth);
  const [dateRangeSelector, setDateRangeSelector] = useState<string>(ALL_TIME);

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonth(Number(event.target.value));
  };

  const handleDateRangeChange = (event: SelectChangeEvent<string>) => {
    setDateRangeSelector(event.target.value);
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
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRangeSelector} onChange={handleDateRangeChange}>
              <MenuItem value={ALL_TIME}>{ALL_TIME}</MenuItem>
              <MenuItem value={'Month'}>Month</MenuItem>
            </Select>
          </FormControl>
          {dateRangeSelector === 'Month' && (
            <Box sx={{ width: '100%', margin: '5% 0' }}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select value={month.toString()} onChange={handleMonthChange}>
                  {MONTHS.map((month, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {month}
                    </MenuItem>
                  ))}
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isUser(user)) {
    return <ProfilePage user={user} />;
  }

  // Default return, should probably be a redirect or a 404 page
  return <div>No user found</div>;
};

// Type guard to check if user is of type `User`
function isUser(user: any): user is User {
  return (
    user &&
    typeof user.sub === 'string' &&
    typeof user.name === 'string' &&
    typeof user.nickname === 'string'
  );
}

export default Profile;
