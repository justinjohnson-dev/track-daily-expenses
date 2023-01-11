import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import { QueryClientProvider } from 'react-query';
import queryClient from '../lib/query-client';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
