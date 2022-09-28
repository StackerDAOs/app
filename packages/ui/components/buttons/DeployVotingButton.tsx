import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { votingExtension } from 'utils/contracts';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { DeployVotingProps } from 'ui/components/buttons/types';
import { useTransaction } from 'ui/hooks';
import { CLUB_EXTENSION_TYPES } from 'api/constants';

export const DeployVotingButton = (props: DeployVotingProps) => {
  const [transactionId, setTransactionId] = React.useState('');
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createExtension = useCreateExtension();
  const transaction = useTransaction(transactionId);

  const deployVoting = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        setTransactionId(data.txId);
        createExtension.mutate({
          club_id: props?.clubId,
          contract_address: `${stxAddress}.${props?.name}`,
          extension_type_id: CLUB_EXTENSION_TYPES.VOTING,
        });
        props?.onFinish(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = votingExtension(
      props.coreDao,
      props.nftMembershipContractAddress,
      props.governanceTokenContractAddress,
      '144',
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
        {...props}
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
      <Button {...props} _hover={{ opacity: 0.9 }} _active={{ opacity: 1 }}>
        <Spinner />
      </Button>
    );
  }

  return (
    <Button
      {...props}
      onClick={deployVoting}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {props?.title || 'Deploy'}
    </Button>
  );
};
