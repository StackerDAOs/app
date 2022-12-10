import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import { useAuth, useOpenContractDeploy } from '@micro-stacks/react';
import { useGenerateName, useTransaction } from 'ui/hooks';

interface StacksDeployProps extends ButtonProps {
  name: string;
  template: string;
  contractName?: string;
  buttonName?: string;
  onSubmit?: (data: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  isDisabled?: boolean;
}

export const StacksDeploy = (props: StacksDeployProps) => {
  const {
    name,
    template,
    contractName,
    buttonName,
    onSubmit,
    onSuccess,
    onError,
    isDisabled,
    ...rest
  } = props;
  const { isSignedIn, openAuthRequest } = useAuth();
  const { openContractDeploy } = useOpenContractDeploy();
  const { randomName } = useGenerateName();
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
          onError?.(data);
          console.error({ e });
        }
      };

      await openContractDeploy({
        contractName: contractName || randomName,
        codeBody: template,
        onFinish: callback,
        onCancel: callback,
      });
    }
  }, [name, isSignedIn, template]);

  if (transaction.data?.tx_status === 'pending') {
    return (
      <Button {...rest} _hover={{ opacity: 0.9 }} _active={{ opacity: 1 }}>
        <Spinner />
      </Button>
    );
  }

  if (transaction.data?.tx_status === 'success') {
    return (
      <Button
        {...rest}
        _hover={{ opacity: 0.9 }}
        _active={{ opacity: 1 }}
        variant='default'
        isDisabled
      >
        Complete
      </Button>
    );
  }

  return (
    <Button {...rest} onClick={deploy} isDisabled={isDisabled}>
      {buttonName || 'Deploy'}
    </Button>
  );
};
