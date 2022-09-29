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
  const { title, contractPrincipal, bootstrapPrincipal, ...rest } = props;
  const { openContractCall } = useOpenContractCall();
  const [contractAddress, contractName] = splitContractAddress(
    contractPrincipal ?? '',
  );
  const [boostrapAddress, bootstrapName] = splitContractAddress(
    bootstrapPrincipal ?? '',
  );

  const initialize = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        console.log({ data });
      } catch (e: any) {
        console.error({ e });
      }
    };

    if (validateContractAddress(bootstrapPrincipal)) {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'init',
        functionArgs: [contractPrincipalCV(boostrapAddress, bootstrapName)],
        postConditions: [],
        onFinish,
      });
    }
  }, [props]);

  return (
    <Button
      {...rest}
      onClick={initialize}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {title || 'Init'}
    </Button>
  );
};
