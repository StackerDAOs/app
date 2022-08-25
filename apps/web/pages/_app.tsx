import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import { ClientProvider } from 'ui/components';

function App({ Component, pageProps }: any) {
  return (
    <ClientProvider
      appName='StackerDAO LABS'
      appIconUrl='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
      network='testnet'
    >
      <ChakraProvider theme={theme}>
        <Head>
          <title>StackerDAO Labs</title>
          <meta name='description' content='StackerDAO Labs' />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClientProvider>
  );
}

export default App;
