import { Alert, Button, Grid, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    email: '',
    password: '',
  });

  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });

  const handleFieldChange = (e: { target: { id: any; value: any } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const simplifyError = (error: string) => {
    const errorMap = {
      CredentialsSignin: 'Invalid email or password',
    };
    return errorMap[error] ?? 'No User Found';
  };

  const handleAuth = async () => {
    setPageState((old) => ({ ...old, processing: true, error: '' }));
    signIn('credentials', {
      ...authState,
      redirect: false,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // Authenticate user
          router.push('/');
        } else {
          setPageState((old) => ({
            ...old,
            processing: false,
            error: response.error,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setPageState((old) => ({
          ...old,
          processing: false,
          error: error.message ?? 'Something went wrong!',
        }));
      });
  };

  return (
    <Grid container alignItems='center' justifyContent='center' height='100vh'>
      <Grid item>
        {pageState.error !== '' && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {simplifyError(pageState.error)}
          </Alert>
        )}
        <h3>Login</h3>
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
          value={authState.password}
          fullWidth
          label='Password'
          type='password'
          id='password'
        />
        <Button
          disabled={pageState.processing}
          sx={{ mb: 1 }}
          onClick={handleAuth}
          fullWidth
          variant='contained'
          style={{
            backgroundColor: '#009879',
          }}
        >
          Login
        </Button>

        <h3>Dont have an account? Sign Up!</h3>
        <Link
          href='/auth/signup'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Button
            variant='outlined'
            style={{
              height: '50px',
            }}
            size='large'
          >
            Sign up
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
