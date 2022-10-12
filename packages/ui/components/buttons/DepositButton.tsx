import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';

// Web3
import { useAccount, useOpenContractCall } from '@micro-stacks/react';
import { uintCV } from 'micro-stacks/clarity';
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from 'micro-stacks/transactions';
import { useAuth } from 'ui/hooks';

// Utils
import { stxToUstx } from 'utils';
import { splitContractAddress } from '@stacks-os/utils';
import { DepositProps } from './types';

export const DepositButton = (props: DepositProps) => {
  const { title, amount, investmentClubAddress, ...rest } = props;
  const auth = useAuth();
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
      functionArgs: [
        uintCV(stxToUstx(amount)),
        uintCV(auth?.data?.membershipPass?.tokenId as number),
      ],
      postConditions: stxAddress
        ? [
            makeStandardSTXPostCondition(
              stxAddress,
              FungibleConditionCode.Equal,
              stxToUstx(amount),
            ),
          ]
        : [],
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
