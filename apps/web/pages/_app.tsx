import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Head>
        <title>StackerDAO Labs</title>
        <meta name='description' content='StackerDAO Labs' />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
