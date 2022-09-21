import React from 'react';
import Link from 'next/link';
import { Box, ButtonGroup, Flex, HStack, Text } from 'ui';

// Hooks
import { useAccountBalance } from 'ui/hooks';

// Web3
import { useAuth } from 'ui/components';

// Utils
import { ustxToStx } from 'utils';
import { ConnectButton } from 'ui/components/buttons';
import { LogoIcon } from 'ui/components/icons';

// Components
// import { MobileAppNavbar } from '@components/navbars';
// import { CustomPopover } from '@components/popovers';
import { Nav } from '../containers';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { data } = useAccountBalance();

  return (
    <Flex justify='flex-end' flex='1'>
      <HStack spacing='3'>
        <ButtonGroup spacing='3' alignItems='center'>
          {isSignedIn ? (
            <HStack cursor='pointer' spacing='5' color='light.900'>
              <HStack spacing='1'>
                <Text fontSize='md' fontWeight='medium' color='light.900'>
                  {ustxToStx(data?.account?.balance)}{' '}
                </Text>
                <Text
                  as='span'
                  fontSize='md'
                  fontWeight='medium'
                  color='light.900'
                >
                  STX
                </Text>
              </HStack>
              <HStack spacing='1'>{/* <CustomPopover /> */}</HStack>
            </HStack>
          ) : null}

          <ConnectButton
            variant='inverted'
            size='md'
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 1 }}
          />
        </ButtonGroup>
      </HStack>
    </Flex>
  );
};

export const MainNavbar = () => (
  <Box as='section' height='5vh'>
    <Nav bg='dark.900'>
      <HStack justify='space-between' spacing='2'>
        <Link href='/'>
          <LogoIcon
            alt='logo'
            url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
            cursor='pointer'
            height='35px'
          />
        </Link>
        <Navbar />
      </HStack>
    </Nav>
  </Box>
);
