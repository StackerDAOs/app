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
} from 'ui';
import type { ButtonProps } from '@chakra-ui/react';
import { useAccount } from 'ui/components';
import { useDAO } from 'ui/hooks';
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
import { getPercentage } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { size } from 'lodash';

interface UserProfileProps {
  club: string;
}

const EXTENSION_SIZE = 6;
const OTHER_REQUIREMENTS_SIZE = 1;

export const UserProfile = (props: UserProfileProps) => {
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const { club } = props;
  return (
    <HStack
      spacing='3'
      ps='2'
      cursor='pointer'
      borderRadius='lg'
      p='3'
      bg='dark.700'
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
    color: 'primary.900',
    fontWeight: 'semibold',
  };
  return (
    <Button
      variant='ghost'
      justifyContent='start'
      borderRadius='lg'
      // bg={isSelected ? 'dark.800' : 'transparent'}
      _hover={{ color: 'light.500' }}
      _active={{ bg: 'transparent' }}
      _focus={{ boxShadow: 'inset 6px 0px 0px #624AF2' }}
      boxShadow={isSelected ? 'inset 6px 0px 0px #624AF2' : 'none'}
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
  const { dao: slug } = router.query as any;
  const isSelected = (path: string) => router.pathname.split('/')[3] === path;
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
              <Circle
                bg='dark.600'
                borderColor='dark.500'
                opacity='0.9'
                borderWidth='1px'
                size='12'
                cursor='pointer'
                _hover={{ opacity: 1 }}
              >
                <Text fontSize='md' fontWeight='medium'>
                  SD
                </Text>
              </Circle>
              <Circle
                bg='primary.900'
                borderColor='dark.500'
                opacity='0.9'
                borderWidth='1px'
                size='12'
                cursor='pointer'
                _hover={{ opacity: 1 }}
              >
                <Text fontSize='md' fontWeight='medium'>
                  CD
                </Text>
              </Circle>
              <Circle
                bg='dark.700'
                borderColor='dark.500'
                opacity='0.9'
                borderWidth='1px'
                size='12'
                cursor='pointer'
                _hover={{ opacity: 1 }}
              >
                <Text fontSize='xl' fontWeight='medium'>
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
          px={{ base: '4', sm: '6' }}
        >
          <Stack justify='space-between' spacing='1'>
            <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
              <UserProfile club={dao?.data?.name} />
              <Divider borderColor='dark.500' />
              <Stack spacing='1'>
                <Link href={`/d/${slug}`}>
                  <NavButton
                    icon={DashboardOutline}
                    label='Dashboard'
                    isSelected={router.pathname.split('/')[3] === undefined}
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
                  <Link key={label} href={`/d/${slug}${route}`}>
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
                    <Link href={`/d/${slug}/setup`}>
                      <Button variant='primary' size='sm'>
                        Finish setup
                      </Button>
                    </Link>
                  </HStack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
