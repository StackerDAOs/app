import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';

// Web3
import { useAccount, useOpenContractCall } from '@micro-stacks/react';
import { uintCV } from 'micro-stacks/clarity';
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from 'micro-stacks/transactions';

// Utils
import { stxToUstx } from 'utils';
import { splitContractAddress } from '@stacks-os/utils';
import { DepositProps } from './types';

export const DepositButton = (props: DepositProps) => {
  const { title, amount, investmentClubAddress, ...rest } = props;
  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();
  const [contractAddress, contractName] = splitContractAddress(
    investmentClubAddress ?? '',
  );

  const deposit = React.useCallback(async () => {
    await openContractCall({
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: 'deposit',
      functionArgs: [uintCV(stxToUstx(amount))],
      postConditions: stxAddress
        ? [
            makeStandardSTXPostCondition(
              stxAddress, // Post condition address
              FungibleConditionCode.Equal, // Post condition code
              stxToUstx(amount), // Post condition amount
            ),
          ]
        : [],
    });
  }, [contractAddress, contractName, props]);

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
