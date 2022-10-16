import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useOpenContractCall } from '@micro-stacks/react';
import { contractPrincipalCV } from 'micro-stacks/clarity';
import { useUpdateInitTxId } from 'api/clubs/mutations';
import { useTransaction } from 'ui/hooks';
import {
  splitContractAddress,
  validateContractAddress,
} from '@stacks-os/utils';
import { BootstrapProps } from './types';

export const InitializeClubButton = (props: BootstrapProps) => {
  const { title, contractPrincipal, bootstrapPrincipal, onSubmit, ...rest } =
    props;
  const [transactionId, setTransactionId] = React.useState('');
  const transaction = useTransaction(transactionId);
  const { openContractCall } = useOpenContractCall();
  const updateInitTxId = useUpdateInitTxId();
  const [contractAddress, contractName] = splitContractAddress(
    contractPrincipal ?? '',
  );
  const [boostrapAddress, bootstrapName] = splitContractAddress(
    bootstrapPrincipal ?? '',
  );

  const initialize = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        setTransactionId(data.txId);
        updateInitTxId.mutate({
          contract_address: contractPrincipal,
          activation_tx_id: data.txId,
        });
        onSubmit?.(data);
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

  if (transaction?.data?.tx_status === 'pending') {
    return (
      <Button {...rest} _hover={{ opacity: 0.9 }} _active={{ opacity: 1 }}>
        <Spinner />
      </Button>
    );
  }

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
