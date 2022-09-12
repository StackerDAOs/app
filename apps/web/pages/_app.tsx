import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import { ClientProvider, StacksNetwork, StacksMainnet } from 'ui/components';

function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  const network: StacksNetwork = new StacksMainnet({
    url: 'https://capable-yolo-moon.stacks-mainnet.discover.quiknode.pro/',
  });

  return (
    <ClientProvider
      appName='StackerDAO LABS'
      appIconUrl='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
      network={network}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <title>StackerDAO Labs</title>
          <meta name='description' content='StackerDAO Labs' />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </ClientProvider>
  );
}

export default App;
