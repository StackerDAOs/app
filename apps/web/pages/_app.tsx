import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import {
  ClientProvider,
  StacksNetwork,
  StacksMainnet,
  StacksTestnet,
} from 'ui/components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'ui/animation';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 3000 },
  },
});

function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  console.log('vercel env', process.env.VERCEL);
  console.log('node env', process.env.NODE);
  console.log('supabase url env', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('sup env', process.env.SUP);
  const network: StacksNetwork =
    process.env.NODE_ENV === 'production'
      ? new StacksMainnet({
          url: 'https://capable-yolo-moon.stacks-mainnet.discover.quiknode.pro/',
        })
      : new StacksTestnet();

  const noWalletFound = () => {
    alert('Please install Hiro Wallet');
  };

  return (
    <SessionProvider session={session}>
      <ClientProvider
        appName='StackerDAO Labs'
        appIconUrl='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
        network={network}
        onNoWalletFound={noWalletFound}
      >
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <title>StackerDAO | Clubs</title>
              <meta name='description' content='StackerDAO Labs' />
            </Head>
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              {getLayout(<Component {...pageProps} />)}
            </AnimatePresence>
          </QueryClientProvider>
        </ChakraProvider>
      </ClientProvider>
    </SessionProvider>
  );
}

export default App;
