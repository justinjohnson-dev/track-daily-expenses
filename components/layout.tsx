import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1 style={{ padding: '0 5%' }}>Daily Expense Tracking</h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant='outlined'
            style={{
              height: '50px',
            }}
            size='large'
          >
            Forms
          </Button>
        </Link>
        <Link
          href='/analytics'
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Button
            variant='outlined'
            style={{
              margin: '1% auto',
              marginLeft: '5%',
              height: '50px',
            }}
          >
            Analytics
          </Button>
        </Link>
      </div>
      <main
        style={{
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </>
  );
}
