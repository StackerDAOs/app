import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import { useAuth, useOpenContractCall } from '@micro-stacks/react';
import { useTransaction } from 'ui/hooks';
import { validateContractAddress } from '@stacks-os/utils';

// const action = {
//   contractAddress,
//   contractName,
//   functionName: 'init',
//   functionArgs: [contractPrincipalCV(boostrapAddress, bootstrapName)],
//   postConditions: [],
//   onFinish: callback,
// }

interface StacksContractCallProps extends ButtonProps {
  contractAddress: string;
  contractName: string;
  action: any;
  buttonName?: string;
  onSubmit?: (data: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  isDisabled?: boolean;
}

export const StacksContractCall = (props: StacksContractCallProps) => {
  const {
    contractAddress,
    contractName,
    action,
    buttonName,
    onSubmit,
    onSuccess,
    onError,
    isDisabled,
    ...rest
  } = props;
  const { isSignedIn, openAuthRequest } = useAuth();
  const { openContractCall } = useOpenContractCall();
  const [transactionId, setTransactionId] = React.useState('');
  const transaction = useTransaction(transactionId);

  const deploy = React.useCallback(async () => {
    if (!isSignedIn) {
      openAuthRequest();
    } else {
      const callback = async (data: any) => {
        try {
          setTransactionId(data.txId);
          onSuccess?.(data);
        } catch (e: any) {
          console.error({ e });
        }
      };

      const contractCall = {
        ...action,
        contractAddress,
        contractName,
        postConditions: action?.postConditions ?? [],
        onFinish: callback,
      };

      if (validateContractAddress(contractAddress)) {
        await openContractCall(contractCall);
      }
    }
  }, [contractAddress]);

  if (transaction.data?.tx_status === 'pending') {
    return (
      <Button {...rest} _hover={{ opacity: 0.9 }} _active={{ opacity: 1 }}>
        <Spinner />
      </Button>
    );
  }

  return (
    <Button {...rest} onClick={deploy} isDisabled={isDisabled}>
      {buttonName}
    </Button>
  );
};
