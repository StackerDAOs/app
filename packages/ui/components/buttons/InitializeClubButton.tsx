import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useOpenContractCall } from '@micro-stacks/react';
import { contractPrincipalCV } from 'micro-stacks/clarity';
import {
  splitContractAddress,
  validateContractAddress,
} from '@stacks-os/utils';
import { BootstrapProps } from './types';

export const InitializeClubButton = (props: BootstrapProps) => {
  const { title, address } = props;
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const [contractAddress, contractName] = splitContractAddress(
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.letsfngooo',
  );

  const initialize = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        console.log({ data });
      } catch (e: any) {
        console.error({ e });
      }
    };

    if (
      validateContractAddress(
        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.letsfngooo',
      )
    ) {
      await openContractCall({
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'stackerdao',
        functionName: 'init',
        functionArgs: [contractPrincipalCV(contractAddress, contractName)],
        postConditions: [],
        onFinish,
      });
    }
  }, [props]);

  return (
    <Button
      {...props}
      onClick={initialize}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {isRequestPending ? <Spinner /> : title || 'Init'}
    </Button>
  );
};
