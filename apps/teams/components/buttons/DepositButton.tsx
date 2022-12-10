import React from 'react';
import { Button, Circle, Icon, Stack, useToast } from 'ui';
import {
  useAccount,
  useOpenContractCall,
  uintCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from 'ui/components';
import { useTeamAuth } from 'ui/hooks';
import { getExplorerLink, stxToUstx } from 'utils';
import { splitContractAddress } from '@stacks-os/utils';
import { CheckCircle, XIcon } from 'ui/components/icons';
import { DepositProps } from './types';

export const DepositButton = (props: DepositProps) => {
  const { title, amount, vaultAddress, reset, ...rest } = props;
  const toast = useToast();
  const auth = useTeamAuth();
  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();
  const [contractAddress, contractName] = splitContractAddress(
    vaultAddress ?? '',
  );
  const deposit = React.useCallback(async () => {
    await openContractCall({
      contractAddress,
      contractName,
      functionName: 'deposit-stx',
      functionArgs: [uintCV(stxToUstx(amount))],
      postConditions: stxAddress
        ? [
            makeStandardSTXPostCondition(
              stxAddress,
              FungibleConditionCode.Equal,
              stxToUstx(amount),
            ),
          ]
        : [],
      onFinish: ({ txId }) => {
        const href = getExplorerLink(txId);
        reset?.();
        toast({
          duration: 5000,
          position: 'bottom-right',
          isClosable: true,
          render: () => (
            <Stack
              direction='row'
              justify='space-between'
              py='2'
              px='3'
              spacing='3'
              bg='dark.800'
              borderRadius='3xl'
              borderColor='dark.500'
              borderWidth='1px'
            >
              <Stack spacing='2'>
                <Stack spacing='3' direction='row' align='center'>
                  <Circle size='8' bg='dark.500' borderRadius='3xl'>
                    <Icon as={CheckCircle} color='secondary.500' boxSize='5' />
                  </Circle>
                  <a href={href} target='_blank' rel='noreferrer'>
                    <Button variant='link' size='sm'>
                      View transaction
                    </Button>
                  </a>
                </Stack>
              </Stack>
              <Button variant='link' size='sm'>
                <Icon
                  as={XIcon}
                  color='light.900'
                  boxSize='5'
                  onClick={() => toast.closeAll()}
                />
              </Button>
            </Stack>
          ),
        });
      },
    });
  }, [contractAddress, contractName, props, auth?.data]);

  return (
    <Button
      {...rest}
      onClick={deposit}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {title || 'Deposit'}
    </Button>
  );
};
