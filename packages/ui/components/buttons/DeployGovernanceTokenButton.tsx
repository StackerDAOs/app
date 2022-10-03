import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { governanceToken } from 'utils/contracts';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { DeployGovernanceTokenProps } from 'ui/components/buttons/types';
import { useTransaction } from 'ui/hooks';
import { CLUB_EXTENSION_TYPES } from 'api/constants';
import { getExplorerLink } from 'utils';

export const DeployGovernanceTokenButton = (
  props: DeployGovernanceTokenProps,
) => {
  const {
    title,
    coreDao,
    name,
    symbol,
    clubId,
    hasExtension,
    onDeploy,
    ...rest
  } = props;
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
          club_id: clubId,
          contract_address: `${stxAddress}.${name}`,
          extension_type_id: CLUB_EXTENSION_TYPES.GOVERNANCE_TOKEN,
          tx_id: data.txId,
        });
        onDeploy?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = governanceToken(name, symbol, coreDao);
    await openContractDeploy({
      contractName: name,
      codeBody,
      onFinish,
    });
  }, [props]);

  if (transaction.data?.tx_status === 'success' || hasExtension) {
    const transactionLink = getExplorerLink(transaction?.data?.tx_id);
    return (
      <Button
        as='a'
        variant='link'
        textDecoration='underline'
        href={transactionLink}
        target='_blank'
        _hover={{ opacity: 0.9 }}
        _active={{ opacity: 1 }}
      >
        View transaction
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
      onClick={deployNFTMembership}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {title || 'Deploy'}
    </Button>
  );
};
