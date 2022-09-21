import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { governanceToken } from 'utils/contracts';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { DeployGovernanceTokenProps } from 'ui/components/buttons/types';
import { useTransaction } from 'ui/hooks';
import { EXTENSION_TYPES } from 'api/constants';

export const DeployGovernanceTokenButton = (
  props: DeployGovernanceTokenProps,
) => {
  const [transactionId, setTransactionId] = React.useState('');
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createExtension = useCreateExtension();
  const transaction = useTransaction(transactionId);

  const deployNFTMembership = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        setTransactionId(data.txId);
        createExtension.mutate({
          club_id: props?.clubId,
          contract_address: `${stxAddress}.${props?.name}`,
          extension_type_id: EXTENSION_TYPES.GOVERNANCE_TOKEN,
        });
        props?.onFinish(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = governanceToken(props?.name, 'CDAO');
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
      onClick={deployNFTMembership}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {props?.title || 'Deploy'}
    </Button>
  );
};