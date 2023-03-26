import type { AppProps } from 'next/app';

// import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import { QueryClientProvider } from 'react-query';
import queryClient from '../lib/query-client';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
  );
}
