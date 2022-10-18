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
  Progress,
  Stack,
  Text,
  useDisclosure,
} from 'ui';
import type { ButtonProps } from '@chakra-ui/react';
import { useAccount, useAuth } from 'ui/components';
import { ConnectButton } from 'ui/components/buttons';
import { useDAO, useClubs } from 'ui/hooks';
import {
  DashboardOutline,
  ProposalOutline,
  ExtensionOutline,
  VaultOutline,
  LightBulbOutline,
  SettingsIcon,
  InfoIcon,
  ToggleUpDown,
} from 'ui/components/icons';
import Avatar from 'boring-avatars';
import { getPercentage, nameToAbbreviation } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { map, size } from 'lodash';

interface UserProfileProps {
  club: string;
}

const EXTENSION_SIZE = 6;
const OTHER_REQUIREMENTS_SIZE = 1;

export const UserProfile = (props: UserProfileProps) => {
  const dropdown = useDisclosure();
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const { club } = props;

  return (
    <>
      <HStack
        {...dropdown.getButtonProps()}
        onFocus={dropdown.onOpen}
        spacing='3'
        cursor='pointer'
        borderRadius='lg'
        p='3'
        _hover={{
          bg: 'dark.700',
        }}
      >
        <Avatar
          size={40}
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
      <Stack
        hidden={!dropdown.isOpen}
        position='absolute'
        top='12%'
        zIndex='1'
        width='88%'
        borderWidth='1px'
        borderColor='dark.500'
        borderRadius='lg'
      >
        <HStack
          spacing='3'
          cursor='pointer'
          borderRadius='lg'
          p='3'
          bg='dark.700'
        >
          <Box>
            <Text color='light.900' fontSize='sm' fontWeight='semibold'>
              {club}
            </Text>
            <Text fontWeight='regular' fontSize='sm' color='light.500'>
              {truncateAddress(stxAddress)}
            </Text>
            <ConnectButton
              variant='link'
              size='md'
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
            />
          </Box>
        </HStack>
      </Stack>
    </>
  );
};

interface NavButtonProps extends ButtonProps {
  icon: any;
  label: string;
  isSelected: boolean;
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, isSelected, ...buttonProps } = props;
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
        <Icon
          as={icon}
          boxSize='6'
          color={isSelected ? 'primary.900' : 'light.500'}
        />
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
        <Flex
          flex='1'
          overflowY='auto'
          boxShadow='sm-dark'
          maxW={{ base: 'full', sm: 'xs' }}
          py={{ base: '6', sm: '8' }}
        >
          <Stack justify='space-between' spacing='1'>
            <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
              <Stack px={{ base: '4', sm: '4' }}>
                <UserProfile club={dao?.data?.name} />
              </Stack>
              <Divider borderColor='dark.500' />
              <Stack spacing='1'>
                <Link href={`/${slug}`}>
                  <NavButton
                    icon={DashboardOutline}
                    label='Dashboard'
                    isSelected={router.pathname.split('/')[2] === undefined}
                  />
                </Link>
                {[
                  { label: 'Vault', route: '/vault', icon: VaultOutline },
                  { label: 'Ideas', route: '/ideas', icon: LightBulbOutline },
                  {
                    label: 'Proposals',
                    route: '/proposals',
                    icon: ProposalOutline,
                  },
                  {
                    label: 'Extensions',
                    route: '/extensions',
                    icon: ExtensionOutline,
                  },
                ].map(({ label, route, icon }) => (
                  <Link key={label} href={`/${slug}${route}`}>
                    <NavButton
                      icon={icon}
                      label={label}
                      isSelected={isSelected(label?.toLocaleLowerCase())}
                    />
                  </Link>
                ))}
              </Stack>
            </Stack>
            <Stack spacing={{ base: '5', sm: '6' }}>
              <Stack spacing='1'>
                <NavButton
                  icon={InfoIcon}
                  label='Help'
                  isSelected={isSelected('/help')}
                />
                <NavButton
                  icon={SettingsIcon}
                  label='Settings'
                  isSelected={isSelected('/settings')}
                />
              </Stack>
              <Stack px={{ base: '4', sm: '4' }}>
                <Box
                  bg='dark.700'
                  px='4'
                  py='5'
                  borderRadius='lg'
                  borderWidth='1px'
                  borderColor='dark.500'
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
                      value={getPercentage(
                        EXTENSION_SIZE + OTHER_REQUIREMENTS_SIZE,
                        size(dao?.data?.extensions),
                      )}
                      bg='dark.500'
                    />
                    <HStack spacing='3'>
                      <Button variant='link' size='sm'>
                        Setup guide
                      </Button>
                      <Link href={`/${slug}/start`}>
                        <Button variant='primary' size='sm'>
                          Finish setup
                        </Button>
                      </Link>
                    </HStack>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
