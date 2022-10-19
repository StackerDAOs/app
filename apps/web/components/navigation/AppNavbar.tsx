import React from 'react';
import { Box, ButtonGroup, Flex, HStack, Text } from 'ui';

// Hooks
import { useAccountBalance } from 'ui/hooks';

// Web3
import { useAuth } from 'ui/components';

// Utils
import { ustxToStx } from 'utils';
import { ConnectButton } from 'ui/components/buttons';

// Components
// import { MobileAppNavbar } from '@components/navbars';
// import { CustomPopover } from '@components/popovers';
import { Nav } from '../containers';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { data } = useAccountBalance();

  return (
    <Flex justify='flex-end'>
      {/* <Tabs isFitted variant='nav'>
        <TabList>
          {['Vault', 'Ideas', 'Proposals', 'Extensions'].map((item) => (
            <Link key={item} href={`/d/${dao}/${item?.toLocaleLowerCase()}`}>
              <Tab
                key={item}
                fontSize='md'
                fontWeight={
                  isSelected(item?.toLocaleLowerCase())
                    ? 'extrabold'
                    : 'regular'
                }
                color={
                  isSelected(item?.toLocaleLowerCase())
                    ? 'light.900'
                    : 'light.500'
                }
              >
                {item}
              </Tab>
            </Link>
          ))}
        </TabList>
      </Tabs> */}
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

export const AppNavbar = () => (
  <Box as='section' height='5vh'>
    <Nav
      bg='dark.900'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
      px={{ base: '4', sm: '6' }}
    >
      <HStack justify='flex-end' spacing='2'>
        {/* <Link href={`/d/${dao}`}>
            <LogoIcon
              alt='logo'
              url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
              cursor='pointer'
              height='35px'
            />
          </Link> */}
        <Navbar />
      </HStack>
    </Nav>
  </Box>
);
