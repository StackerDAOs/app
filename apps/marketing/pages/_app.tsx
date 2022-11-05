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
          <title>StackerDAO</title>
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
  );
}

export default App;
