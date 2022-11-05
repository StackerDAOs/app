import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import {
  ClientProvider,
  StacksNetwork,
  StacksMainnet,
  StacksTestnet,
  StacksMocknet,
} from 'ui/components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'ui/animation';
import { SessionProvider } from 'next-auth/react';
import { isMainnet, isTestnet } from 'api/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 3000 },
  },
});

const getNetwork = (): StacksNetwork => {
  if (isMainnet) {
    return new StacksMainnet({
      url: 'https://capable-yolo-moon.stacks-mainnet.discover.quiknode.pro/',
    });
  }
  if (isTestnet) {
    return new StacksTestnet();
  }
  return new StacksMocknet();
};

const noWalletFound = () => {
  alert('Please install Hiro Wallet');
};

function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <SessionProvider session={session}>
      <ClientProvider
        appName='StackerDAO Labs'
        appIconUrl='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
        network={getNetwork()}
        onNoWalletFound={noWalletFound}
      >
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Head>
              <title>StackerDAO | Clubs</title>
              <meta name='description' content='StackerDAO Labs' />
              <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width'
              />
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
