import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { investmentClub } from 'utils/contracts';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { DeployICProps } from 'ui/components/buttons/types';
import { useTransaction } from 'ui/hooks';
import { CLUB_EXTENSION_TYPES } from 'api/constants';

export const DeployICButton = (props: DeployICProps) => {
  const {
    title,
    coreDao,
    name,
    clubId,
    hasExtension,
    nftMembershipContractAddress,
    governanceTokenContractAddress,
    vaultContractAddress,
    startWindow,
    minimumDeposit,
    onFinish,
    ...rest
  } = props;
  const [transactionId, setTransactionId] = React.useState('');
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createExtension = useCreateExtension();
  const transaction = useTransaction(transactionId);

  const deployInvestmentClub = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        setTransactionId(data.txId);
        createExtension.mutate({
          club_id: clubId,
          contract_address: `${stxAddress}.${name}`,
          extension_type_id: CLUB_EXTENSION_TYPES.INVESTMENT_CLUB,
        });
        onFinish?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = investmentClub(
      coreDao,
      nftMembershipContractAddress,
      governanceTokenContractAddress,
      vaultContractAddress,
      String(Number(startWindow) * 144),
      minimumDeposit,
    );
    await openContractDeploy({
      contractName: props?.name,
      codeBody,
      onFinish,
    });
  }, [props]);

  if (transaction.data?.tx_status === 'success' || props?.hasExtension) {
    return (
      <Button
        {...rest}
        isDisabled
        _hover={{ opacity: 0.9 }}
        _active={{ opacity: 1 }}
      >
        Deployed
      </Button>
    );
  }

  if (transaction.data?.tx_status === 'pending') {
    return (
      <Button {...rest} _hover={{ opacity: 0.9 }} _active={{ opacity: 1 }}>
        <Spinner />
      </Button>
    );
  }

  return (
    <Button
      {...rest}
      onClick={deployInvestmentClub}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {props?.title || 'Deploy'}
    </Button>
  );
};
