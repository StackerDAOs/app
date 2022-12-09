import React from 'react';
import {
  Stack,
  FlexProps,
  HStack,
  Icon,
  Text,
  useMenuButton,
} from '@chakra-ui/react';
import { useAccount } from 'ui/components';
import Avatar from 'boring-avatars';
import { truncateAddress } from '@stacks-os/utils';
import { ChevronDown } from 'ui/components/icons';

interface AccountSwitcherButtonProps extends FlexProps {
  dao: string;
}

export const AccountSwitcherButton = (props: AccountSwitcherButtonProps) => {
  const { dao } = props;
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const buttonProps = useMenuButton(props);
  return (
    <Stack justify='center' p='6'>
      <Stack
        as='button'
        {...buttonProps}
        spacing='3'
        cursor='pointer'
        borderRadius='lg'
        userSelect='none'
        outline='0'
        transition='all 0.2s'
        align='flex-end'
        direction='row'
        justify='space-between'
      >
        <HStack align='center' spacing='3'>
          <Avatar
            size={30}
            name={dao}
            variant='sunset'
            colors={['#624AF2', '#7301fa', '#eb00ff', '#27cb9f']}
          />
          <Stack spacing='-1'>
            <Text fontWeight='regular' fontSize='xs' color='gray'>
              {truncateAddress(stxAddress)}
            </Text>
            <Text
              color='light.900'
              fontSize='lg'
              fontWeight='regular'
              letterSpacing='wide'
            >
              {dao}
            </Text>
          </Stack>
        </HStack>

        <Icon as={ChevronDown} color='gray' />
      </Stack>
    </Stack>
  );
};
