import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'ui/animation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 3000 },
  },
});

function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>SD | Teams</title>
          <meta name='description' content='StackerDAO Labs' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <meta name='image' content='/meta-image.png' />
          <link rel='icon' sizes='192x192' href='/android-chrome-192x192.png' />
          <link rel='icon' sizes='512x512' href='/android-chrome-512x512.png' />
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
        </Head>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          {getLayout(<Component {...pageProps} />)}
        </AnimatePresence>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
