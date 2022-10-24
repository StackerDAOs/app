import { Button, Stack, Text } from 'ui';
import Link from 'next/link';

import { LogoIcon } from 'ui/components/icons';

export const Footer = () => (
  <Stack
    bg='dark.500'
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
        &copy; {new Date().getFullYear()} StackerDAO Labs, Inc. All rights
        reserved.
      </Text>
    </Stack>
    <Stack
      direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
      spacing={{ base: '12', md: '8' }}
    >
      <Stack direction='row' spacing='8'>
        <Stack spacing='4' minW='36' flex='1'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Product
          </Text>
          <Stack spacing='3' shouldWrapChildren>
            <Link href='/clubs'>
              <Button variant='link'>Clubs</Button>
            </Link>
            <Link href='/teams'>
              <Button variant='link'>Teams</Button>
            </Link>
            <Link href='/daos'>
              <Button variant='link'>DAOs</Button>
            </Link>
          </Stack>
        </Stack>
        <Stack spacing='4' minW='36' flex='1'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Resources
          </Text>
          <Stack spacing='3' shouldWrapChildren>
            <Button
              as='a'
              href='https://stackerdaos.gitbook.io/stackerdao-labs-wiki/overview/revolutionize-collective-ownership'
              target='_blank'
              variant='link'
            >
              Docs
            </Button>
            <Button
              as='a'
              href='https://github.com/StackerDAOs'
              target='_blank'
              variant='link'
            >
              Github
            </Button>
          </Stack>
        </Stack>
        <Stack spacing='4' minW='36' flex='1'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Legal
          </Text>
          <Stack spacing='3' shouldWrapChildren>
            <Button
              as='a'
              href='/files/stackerdaolabs-terms.pdf'
              target='_blank'
              variant='link'
            >
              Terms of Service
            </Button>
            <Button
              as='a'
              href='/files/stackerdaolabs-privacy.pdf'
              target='_blank'
              variant='link'
            >
              Privacy Policy
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);
