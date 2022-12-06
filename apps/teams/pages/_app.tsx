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

export const queryClient = new QueryClient({
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
              <title>SD | Teams</title>
              <meta name='description' content='StackerDAO Labs' />
              <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width'
              />
              <meta
                name='image'
                content='https://web-nine-zeta.vercel.app/images/proposal-hero.png'
              />
              <link
                rel='icon'
                sizes='192x192'
                href='/android-chrome-192x192.png'
              />
              <link
                rel='icon'
                sizes='512x512'
                href='/android-chrome-512x512.png'
              />
              <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/apple-touch-icon.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicon-32x32.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicon-16x16.png'
              />
              <link rel='manifest' href='/site.webmanifest' />
              <meta name='msapplication-TileColor' content='#da532c' />
              <meta name='theme-color' content='#ffffff' />
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
