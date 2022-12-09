import React from 'react';
import {
  Button,
  HStack,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from 'ui';
import { ConnectButton } from 'ui/components/buttons';
import { useAuth } from 'ui/components';
import { useTeamAccountBalance } from 'ui/hooks';
import { AccountSwitcherButton } from '@components/buttons';
import { ustxToStx } from 'utils';

interface AccountSwitcherProps {
  dao: string;
}

export const AccountSwitcher = (props: AccountSwitcherProps) => {
  const { dao } = props;
  const { data } = useTeamAccountBalance();
  const { openAuthRequest } = useAuth();

  const switchAccount = () => {
    openAuthRequest();
  };
  return (
    <Menu>
      <AccountSwitcherButton dao={dao} />
      <MenuList
        bg='dark.900'
        borderColor='dark.500'
        mt='6'
        py='4'
        color='gray'
        px='3'
      >
        <MenuItem
          rounded='md'
          _focus={{
            bg: 'none',
          }}
          _hover={{
            cursor: 'default',
            bg: 'none',
          }}
        >
          <HStack spacing='1'>
            <Text fontSize='sm' fontWeight='regular' color='light.900'>
              {ustxToStx(data?.account?.balance)}{' '}
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
        </MenuItem>
        <MenuItem
          rounded='md'
          _focus={{
            bg: 'none',
          }}
          _hover={{
            bg: 'dark.500',
          }}
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
        </MenuItem>
        <MenuDivider />
        <MenuItem
          rounded='md'
          _focus={{
            bg: 'none',
          }}
          _hover={{
            bg: 'dark.500',
          }}
        >
          <ConnectButton
            variant='link'
            size='sm'
            fontWeight='light'
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 1 }}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
