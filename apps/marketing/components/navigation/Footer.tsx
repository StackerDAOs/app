import Link from 'next/link';
import { Button, Stack, SimpleGrid, Text } from 'ui';
import { Banner } from '@components/misc';
import { LogoIcon, InfoIcon } from 'ui/components/icons';

export const Footer = () => (
  <Stack bg='dark.800'>
    <Stack
      spacing='8'
      direction={{ base: 'column', md: 'row' }}
      justify='space-between'
      py={{ base: '12', md: '16' }}
      px='12'
    >
      <Stack spacing={{ base: '6', md: '8' }} align='start'>
        <LogoIcon
          alt='logo'
          url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
          cursor='pointer'
          height='35px'
        />
        <Text color='muted'>
          &copy; {new Date().getFullYear()} StackerDAO Labs All rights reserved.
        </Text>
      </Stack>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          gap='8'
          width={{ base: 'full', lg: 'auto' }}
        >
          <Stack spacing='4' minW='36' flex='1'>
            <Text fontSize='md' fontWeight='semibold'>
              Product
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Link href='/get-started'>
                <Button variant='link' size='sm'>
                  Getting Started
                </Button>
              </Link>
              <Link href='/clubs'>
                <Button variant='link' size='sm'>
                  Clubs
                </Button>
              </Link>
              <Link href='/teams'>
                <Button variant='link' size='sm'>
                  Teams
                </Button>
              </Link>
              <Link href='/daos'>
                <Button variant='link' size='sm'>
                  DAOs
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Stack spacing='4' minW='36' flex='1'>
            <Text fontSize='md' fontWeight='semibold'>
              Resources
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Button
                as='a'
                href='https://stackerdaos.gitbook.io/stackerdao-labs-wiki/overview/revolutionize-collective-ownership'
                target='_blank'
                variant='link'
                size='sm'
              >
                Docs
              </Button>
              <Button
                as='a'
                href='https://github.com/StackerDAOs'
                target='_blank'
                variant='link'
                size='sm'
              >
                Github
              </Button>
              <Button
                as='a'
                href='https://twitter.com/stackerdaolabs'
                target='_blank'
                variant='link'
                size='sm'
              >
                Twitter
              </Button>
              <Button
                as='a'
                href='https://github.com/StackerDAOs'
                target='_blank'
                variant='link'
                size='sm'
              >
                Discord
              </Button>
            </Stack>
          </Stack>
          <Stack spacing='4' minW='36' flex='1'>
            <Text fontSize='md' fontWeight='semibold'>
              Legal
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Button
                as='a'
                href='/files/stackerdaolabs-terms.pdf'
                target='_blank'
                variant='link'
                size='sm'
              >
                Terms of Service
              </Button>
              <Button
                as='a'
                href='/files/stackerdaolabs-privacy.pdf'
                target='_blank'
                variant='link'
                size='sm'
              >
                Privacy Policy
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Stack>
    <Banner
      icon={InfoIcon}
      message='StackerDAOs is currently in beta. While the smart contracts that
                you can interact with on our platform have been thoroughly
                reviewed and tested, they are still pending audit and bugs may
                be present. You agree to use StackerDAOs at your own risk.'
      px='12'
      py='6'
      bg='dark.800'
      borderTopWidth='1px'
      borderTopColor='dark.500'
    />
  </Stack>
);
