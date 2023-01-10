import type { AppProps } from 'next/app';
import queryClient from '../lib/query-client';
import { QueryClientProvider } from 'react-query';
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {' '}
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
