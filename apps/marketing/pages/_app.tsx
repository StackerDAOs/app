import Head from 'next/head';
import { theme, ChakraProvider } from 'ui';
import { AnimatePresence } from 'ui/animation';

function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>StackerDAOs</title>
        <meta name='description' content='StackerDAOs' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='image' content='/meta-image.png' />
        <meta property='og:image' content='/meta-image.png' />
        <meta property='og:title' content='StackerDAOs' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content='Ownership & Action. Together.'
        />
        {/* Twitter Meta Tags */}
        <meta property='og:url' content='https://stackerdaos.com' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:domain'
          content='https://twitter.com/stackerdaolabs'
        />
        <meta property='twitter:url' content='https://stackerdaos.com' />
        <meta name='twitter:title' content='StackerDAOs' />
        <meta
          name='twitter:description'
          content='Ownership & Action. Together.'
        />
        <meta name='twitter:image' content='/meta-image.png' />
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
    </ChakraProvider>
  );
}

export default App;
