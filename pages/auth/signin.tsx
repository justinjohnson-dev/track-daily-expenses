import { Alert, Button, Grid, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    gmail: '',
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
      CredentialsSignin: 'Invalid gmail or password',
    };
    return errorMap[error] ?? 'Unknown error occurred';
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
        <TextField
          sx={{ mb: 1 }}
          onChange={handleFieldChange}
          value={authState.gmail}
          fullWidth
          label='gmail'
          id='gmail'
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
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

// import { NextPage } from 'next';
// import { FormEventHandler, useState } from 'react';
// import { signIn } from 'next-auth/react';
// interface Props {}
// const SignIn: NextPage = (props): JSX.Element => {
//   const [userInfo, setUserInfo] = useState({ email: '', password: '' });
//   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
//     const res = await signIn('credentials', {
//       email: userInfo.email,
//       password: userInfo.password,
//       redirect: false,
//     });
//     console.log(res);
//   };
//   return (
//     <div className='sign-in-form'>
//       <form onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <input
//           value={userInfo.email}
//           onChange={({ target }) =>
//             setUserInfo({ ...userInfo, email: target.value })
//           }
//           type='email'
//           placeholder='john@email.com'
//         />
//         <input
//           value={userInfo.password}
//           onChange={({ target }) =>
//             setUserInfo({ ...userInfo, password: target.value })
//           }
//           type='password'
//           placeholder='****'
//         />
//         <input type='submit' value='login' />
//       </form>
//     </div>
//   );
// };
// export default SignIn;
