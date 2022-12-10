import React from 'react';
import { Button } from 'ui';

// Web3
import {
  useAccount,
  useOpenContractCall,
  uintCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from 'ui/components';

import { useAuth, useTransaction } from 'ui/hooks';

// Utils
import { stxToUstx } from 'utils';
import { splitContractAddress } from '@stacks-os/utils';
import { DepositProps } from './types';

export const DepositButton = (props: DepositProps) => {
  const { title, amount, extensionAddress, ...rest } = props;
  const [transactionId, setTransactionId] = React.useState<string>('');
  const auth = useAuth();
  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();
  const [contractAddress, contractName] = splitContractAddress(
    extensionAddress ?? '',
  );
  const transaction = useTransaction(transactionId);
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
      onFinish: (data) => {
        setTransactionId(data.txId);
      },
    });
  }, [contractAddress, contractName, props, auth?.data]);

  if (transaction?.data?.tx_status === 'pending') {
    <Button variant='primary' isLoading />;
  }

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
