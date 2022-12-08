import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from 'ui';
import type { TextProps, ButtonProps } from '@chakra-ui/react';
import { useAccount, useAuth } from 'ui/components';
import { ConnectButton } from 'ui/components/buttons';
import { useTeamAccountBalance, useTeam } from 'ui/hooks';
import { ChevronDown } from 'ui/components/icons';
import Avatar from 'boring-avatars';
import { ustxToStx } from 'utils';
import { truncateAddress } from '@stacks-os/utils';

interface UserProfileProps {
  club: string;
}

export const UserProfile = (props: UserProfileProps) => {
  const account = useAccount();
  const { openAuthRequest } = useAuth();
  const stxAddress = account?.stxAddress as string;
  const { club } = props;
  const { data } = useTeamAccountBalance();
  const switchAccount = () => {
    openAuthRequest();
  };

  return (
    <Popover trigger='click' placement='bottom-start'>
      <PopoverTrigger>
        <Stack
          spacing='3'
          cursor='pointer'
          borderRadius='lg'
          pt='4'
          px='6'
          justify='center'
        >
          <Avatar
            size={30}
            name={club}
            variant='sunset'
            colors={['#624AF2', '#7301fa', '#eb00ff', '#27cb9f']}
          />

          <Stack spacing='0'>
            <Text fontWeight='light' fontSize='xs' color='gray'>
              {truncateAddress(stxAddress)}
            </Text>
            <HStack justify='space-between'>
              <Text
                color='light.900'
                fontSize='lg'
                fontWeight='medium'
                letterSpacing='wide'
              >
                {club}
              </Text>
              <Icon as={ChevronDown} color='gray' />
            </HStack>
          </Stack>
        </Stack>
      </PopoverTrigger>
      <PopoverContent
        borderColor='dark.500'
        borderWidth='1px'
        bg='dark.800'
        maxWidth='85%'
        _focus={{ outline: 'none' }}
      >
        <PopoverHeader bg='dark.500' borderColor='dark.500'>
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
            _hover={{ cursor: 'pointer', bg: 'dark.800' }}
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
          _hover={{ cursor: 'pointer', bg: 'dark.800' }}
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

const NavHeading = (props: TextProps) => (
  <Text
    as='h4'
    fontSize='xs'
    fontWeight='semibold'
    px='4'
    lineHeight='1.25'
    color='gray'
    {...props}
  />
);

interface NavButtonProps extends ButtonProps {
  label: string;
  isSelected: boolean;
}

export const NavButton = (props: NavButtonProps) => {
  const { label, isSelected, ...buttonProps } = props;

  return (
    <Button
      px='6'
      variant='ghost'
      justifyContent='start'
      borderTopLeftRadius='sm'
      borderBottomLeftRadius='sm'
      borderTopRightRadius='none'
      borderBottomRightRadius='none'
      fontWeight='light'
      bg={isSelected ? 'dark.800' : 'transparent'}
      _hover={{ bg: 'dark.800', color: 'light.900' }}
      _selected={{
        fontWeight: 'regular',
      }}
      _active={{
        color: 'light.900',
        bg: 'dark.800',
        borderColor: 'transparent',
      }}
      _focus={{
        color: 'light.900',
        bg: 'dark.800',
        boxShadow: 'inset -4px 0px 0px #624AF2',
      }}
      boxShadow={isSelected ? 'inset -4px 0px 0px #624AF2' : 'none'}
      {...buttonProps}
    >
      {isSelected ? (
        <Text fontWeight='medium'>{label}</Text>
      ) : (
        <Text color='light.500' fontWeight='regular'>
          {label}
        </Text>
      )}
    </Button>
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const dao = useTeam();
  const { dao: slug } = router.query as any;
  const isSelected = (path: string) => router.pathname.split('/')[2] === path;

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
      <Flex flex='1' overflowY='auto'>
        <Stack justify='space-between' spacing='1' w='100%'>
          <Stack>
            <UserProfile club={dao?.data?.name} />
            <Divider borderColor='dark.500' />
            <Stack spacing='2' py='3'>
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
            <Stack spacing={{ base: '5', sm: '6' }}>
              <Stack spacing='3'>
                <NavHeading>Configuration</NavHeading>
                <Stack spacing='1'>
                  <NavButton label='Help' isSelected={isSelected('Help')} />
                  <NavButton
                    label='Settings'
                    isSelected={isSelected('Settings')}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
