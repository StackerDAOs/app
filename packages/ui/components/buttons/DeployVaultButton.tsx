import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { vault } from 'utils/contracts';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { DeployVaultProps } from 'ui/components/buttons/types';
import { useTransaction } from 'ui/hooks';
import { CLUB_EXTENSION_TYPES } from 'api/constants';

export const DeployVaultButton = (props: DeployVaultProps) => {
  const { title, coreDao, name, clubId, hasExtension, onFinish, ...rest } =
    props;
  const [transactionId, setTransactionId] = React.useState('');
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createExtension = useCreateExtension();
  const transaction = useTransaction(transactionId);

  const deployVault = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        setTransactionId(data.txId);
        createExtension.mutate({
          club_id: clubId,
          contract_address: `${stxAddress}.${name}`,
          extension_type_id: CLUB_EXTENSION_TYPES.VAULT,
        });
        onFinish?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = vault(coreDao);
    await openContractDeploy({
      contractName: name,
      codeBody,
      onFinish,
    });
  }, [props]);

  if (transaction.data?.tx_status === 'success' || hasExtension) {
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
      onClick={deployVault}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {title || 'Deploy'}
    </Button>
  );
};
