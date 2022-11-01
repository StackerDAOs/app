import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Stack,
  Text,
} from 'ui';
import type { ButtonProps } from '@chakra-ui/react';
import { useAccount, useAuth } from 'ui/components';
import { ConnectButton } from 'ui/components/buttons';
import { useAccountBalance, useDAO, useClubs, useSubmissions } from 'ui/hooks';
import { ToggleUpDown } from 'ui/components/icons';
import Avatar from 'boring-avatars';
import { getPercentage, nameToAbbreviation, ustxToStx } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { map, size } from 'lodash';

interface UserProfileProps {
  club: string;
}

const EXTENSION_SIZE = 6;

export const UserProfile = (props: UserProfileProps) => {
  const account = useAccount();
  const { openAuthRequest } = useAuth();
  const stxAddress = account?.stxAddress as string;
  const { club } = props;
  const { data } = useAccountBalance();
  const switchAccount = () => {
    openAuthRequest();
  };

  return (
    <Popover trigger='click' placement='bottom-start'>
      <PopoverTrigger>
        <HStack
          spacing='3'
          cursor='pointer'
          borderRadius='lg'
          p='3'
          justify='center'
        >
          <Avatar
            size={35}
            name={stxAddress}
            variant='marble'
            colors={['#624AF2', '#7301fa', '#eb00ff', '#50DDC3']}
          />
          <Box>
            <Text color='light.900' fontSize='sm' fontWeight='semibold'>
              {club}
            </Text>
            <Text fontWeight='regular' fontSize='sm' color='light.500'>
              {truncateAddress(stxAddress)}
            </Text>
          </Box>
          <Icon as={ToggleUpDown} color='light.500' fontSize='2xl' />
        </HStack>
      </PopoverTrigger>
      <PopoverContent
        borderColor='dark.500'
        borderWidth='1px'
        bg='dark.900'
        maxWidth='78.5%'
        _focus={{ outline: 'none' }}
      >
        <PopoverHeader
          bg='dark.500'
          borderColor='dark.500'
          // borderTopLeftRadius='lg'
          // borderTopRightRadius='lg'
        >
          <HStack spacing='5' color='light.900'>
            <HStack spacing='1'>
              <Text fontSize='sm' fontWeight='regular' color='light.900'>
                Balance {ustxToStx(data?.account?.balance)}{' '}
              </Text>
              <Text
                as='span'
                fontSize='sm'
                fontWeight='regular'
                color='light.900'
              >
                STX
              </Text>
            </HStack>
          </HStack>
        </PopoverHeader>
        <Stack>
          <Stack
            align='flex-start'
            spacing='3'
            p='3'
            _hover={{ cursor: 'pointer', bg: 'dark.700' }}
          >
            <Button
              variant='link'
              size='sm'
              fontWeight='light'
              onClick={switchAccount}
              _hover={{ opacity: 0.9 }}
            >
              Switch account
            </Button>
          </Stack>
        </Stack>
        <PopoverFooter
          borderColor='dark.500'
          _hover={{ cursor: 'pointer', bg: 'dark.700' }}
        >
          <ConnectButton
            variant='link'
            size='sm'
            fontWeight='light'
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 1 }}
          />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

interface NavButtonProps extends ButtonProps {
  label: string;
  isSelected: boolean;
}

export const NavButton = (props: NavButtonProps) => {
  const { label, isSelected, ...buttonProps } = props;
  const selectedStyles = {
    color: 'light.900',
    fontWeight: 'semibold',
  };
  return (
    <Button
      variant='ghost'
      justifyContent='start'
      borderTopLeftRadius='sm'
      borderBottomLeftRadius='sm'
      borderTopRightRadius='none'
      borderBottomRightRadius='none'
      bg={isSelected ? 'dark.700' : 'transparent'}
      _hover={{ bg: 'dark.700', color: 'transparent' }}
      _selected={selectedStyles}
      _active={{
        color: 'light.900',
        bg: 'dark.700',
        borderColor: 'transparent',
      }}
      _focus={{
        color: 'light.900',
        bg: 'dark.700',
        boxShadow: 'inset 4px 0px 0px #624AF2',
      }}
      boxShadow={isSelected ? 'inset 4px 0px 0px #624AF2' : 'none'}
      {...buttonProps}
    >
      <HStack spacing='3'>
        {isSelected ? (
          <Text {...selectedStyles}>{label}</Text>
        ) : (
          <Text color='light.500' fontWeight='medium'>
            {label}
          </Text>
        )}
      </HStack>
    </Button>
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const dao = useDAO();
  const { isSignedIn } = useAuth();
  const { dao: slug } = router.query as any;
  const isSelected = (path: string) => router.pathname.split('/')[2] === path;
  const { isLoading, data: clubs } = useClubs();
  const isActive = dao.data?.active;
  const submissions = useSubmissions();
  const hasPendingSubmissions = size(submissions?.data) > 0;

  const InboxContainer = (
    <Stack px={{ base: '4', sm: '4' }} hidden={isActive}>
      <Box
        bg='dark.700'
        px='4'
        py='5'
        borderRadius='lg'
        borderWidth='1px'
        borderColor='dark.500'
        maxW='225px'
      >
        <Stack spacing='4'>
          <Stack spacing='1'>
            <Text fontSize='sm' fontWeight='semibold'>
              You still have a few steps left
            </Text>
            <Text fontSize='sm' color='gray'>
              Finish deploying your Club contracts to get started.
            </Text>
          </Stack>

          <Progress
            colorScheme='primary'
            borderRadius='lg'
            size='md'
            value={getPercentage(EXTENSION_SIZE, size(dao?.data?.extensions))}
            bg='dark.500'
          />
          <HStack spacing='3'>
            <Link href={`/${slug}/start`}>
              <Button variant='primary' size='sm' isFullWidth>
                Finish setup
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );

  const DeploymentContainer = (
    <Stack px={{ base: '4', sm: '4' }} hidden={!hasPendingSubmissions}>
      <Box
        bg='dark.700'
        px='4'
        py='5'
        borderRadius='lg'
        borderWidth='1px'
        borderColor='dark.500'
        maxW='300px'
      >
        <Stack spacing='4'>
          <Stack spacing='1'>
            <Text fontSize='sm' fontWeight='semibold'>
              You have proposals ready for submission!
            </Text>
            <Text fontSize='sm' color='gray'>
              When you&apos;re ready, submit your proposal to the Club.
            </Text>
          </Stack>
          <HStack spacing='3'>
            <Button variant='primary' size='sm' isFullWidth>
              Submit proposals
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );

  if (isLoading) return null;

  if (!dao?.data || !isSignedIn) {
    return (
      <Flex
        as='section'
        minH='100vh'
        bg='dark.900'
        position='sticky'
        top='0'
        zIndex='2'
        borderRightWidth='1px'
        borderRightColor='dark.500'
      >
        <Flex
          flex='1'
          overflowY='auto'
          boxShadow='sm-dark'
          maxW={{ base: 'full', sm: 'xs' }}
          minW='100px'
          justify='center'
          py={{ base: '6', sm: '8' }}
          px={{ base: '4', sm: '6' }}
        >
          <Stack justify='space-between' spacing='1'>
            <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
              {map(clubs, (data, index) => (
                <Circle
                  key={index}
                  bg='primary-accent.900'
                  borderColor='dark.500'
                  opacity='0.9'
                  borderWidth='1px'
                  size='12'
                  cursor='pointer'
                  onClick={() => router.push(`/${data.club?.slug}`)}
                  _hover={{ opacity: 1 }}
                >
                  <Text fontSize='md' fontWeight='medium'>
                    {nameToAbbreviation(data.club?.slug)}
                  </Text>
                </Circle>
              ))}
              <Circle
                hidden={!isSignedIn}
                bg='light.500'
                borderColor='dark.500'
                borderWidth='1px'
                size='12'
                cursor='pointer'
                _hover={{ bg: 'light.900' }}
              >
                <Text color='dark.700' fontSize='xl' fontWeight='medium'>
                  +
                </Text>
              </Circle>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Flex
        as='section'
        minH='100vh'
        bg='dark.900'
        position='sticky'
        top='0'
        zIndex='2'
        borderRightWidth='1px'
        borderRightColor='dark.500'
      >
        <Flex
          flex='1'
          overflowY='auto'
          boxShadow='sm-dark'
          maxW={{ base: 'full', sm: 'xs' }}
          py={{ base: '6', sm: '8' }}
          px={{ base: '4', sm: '6' }}
        >
          <Stack justify='space-between' spacing='1'>
            <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
              {map(clubs, (data, index) => (
                <Circle
                  key={index}
                  bg='primary-accent.900'
                  borderColor='dark.500'
                  opacity='0.9'
                  borderWidth='1px'
                  size='12'
                  cursor='pointer'
                  onClick={() => router.push(`/${data.club?.slug}`)}
                  _hover={{ opacity: 1 }}
                >
                  <Text fontSize='md' fontWeight='medium'>
                    {nameToAbbreviation(data.club?.slug)}
                  </Text>
                </Circle>
              ))}
              <Circle
                bg='light.500'
                borderColor='dark.500'
                opacity='0.9'
                borderWidth='1px'
                size='12'
                cursor='pointer'
                _hover={{ opacity: 1 }}
              >
                <Text color='dark.700' fontSize='xl' fontWeight='medium'>
                  +
                </Text>
              </Circle>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
      <Flex
        as='section'
        minH='100vh'
        bg='dark.900'
        position='sticky'
        top='0'
        zIndex='2'
        borderRightWidth='1px'
        borderRightColor='dark.500'
      >
        <Flex flex='1' overflowY='auto' w='250px' py={{ base: '6', sm: '8' }}>
          <Stack justify='space-between' spacing='1' w='100%'>
            <Stack spacing={{ base: '3', sm: '3' }} shouldWrapChildren>
              <UserProfile club={dao?.data?.name} />
              <Divider borderColor='dark.500' />
              <Stack spacing='1'>
                <Link href={`/${slug}`}>
                  <NavButton
                    label='Dashboard'
                    isSelected={router.pathname.split('/')[2] === undefined}
                  />
                </Link>
                {[
                  { label: 'Vault', route: '/vault' },
                  { label: 'Ideas', route: '/ideas' },
                  {
                    label: 'Proposals',
                    route: '/proposals',
                  },
                  {
                    label: 'Extensions',
                    route: '/extensions',
                  },
                ].map(({ label, route }) => (
                  <Link key={label} href={`/${slug}${route}`}>
                    <NavButton
                      label={label}
                      isSelected={isSelected(label?.toLocaleLowerCase())}
                    />
                  </Link>
                ))}
              </Stack>
            </Stack>
            {InboxContainer}
            {DeploymentContainer}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
