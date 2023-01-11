import type { AppProps } from 'next/app';
import queryClient from '../lib/query-client';
import { QueryClientProvider } from 'react-query';
import Layout from '../components/layout';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {' '}
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
