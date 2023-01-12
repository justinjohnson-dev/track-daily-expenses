import { Alert, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useCreateUserMutation from '../../hooks/use-signup-mutation';

export default function Signup() {
  const router = useRouter();

  const createUserMutation = useCreateUserMutation();
  const [authState, setAuthState] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });

  const handleFieldChange = (e: { target: { id: any; value: any } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async () => {
    const response = await createUserMutation.mutateAsync(authState);
    if (response.id) {
      router.push('/auth/signin');
    } else {
      setPageState((old) => ({
        ...old,
        processing: false,
        error: response.error,
      }));
    }
  };

  return (
    <Grid container alignItems='center' justifyContent='center' height='100vh'>
      <Grid
        item
        alignItems='center'
        justifyContent='center'
        style={{
          width: '90%',
        }}
      >
        <h3>Sign up</h3>
        <TextField
          sx={{ mb: 1 }}
          onChange={handleFieldChange}
          value={authState.email}
          fullWidth
          label='email'
          id='email'
        />
        <TextField
          sx={{ mb: 1 }}
          onChange={handleFieldChange}
          value={authState.username}
          fullWidth
          label='username'
          id='username'
        />
        <TextField
          sx={{ mb: 1 }}
          onChange={handleFieldChange}
          value={authState.password}
          fullWidth
          label='Password'
          type='password'
          id='password'
        />
        <Button
          disabled={pageState.processing}
          sx={{ mb: 1 }}
          onClick={handleSignUp}
          fullWidth
          variant='contained'
          style={{
            backgroundColor: '#009879',
          }}
        >
          Sign Up
        </Button>
        <h3>
          Already have an account?{' '}
          <Link href='/auth/signin' style={{ color: 'inherit' }}>
            Sign in
          </Link>
        </h3>
      </Grid>
    </Grid>
  );
}
