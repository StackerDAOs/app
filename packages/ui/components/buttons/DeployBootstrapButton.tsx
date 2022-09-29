import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { bootstrapProposal } from 'utils/contracts/bootstrap';
import { useUpdateBootstrap } from 'api/clubs/mutations';
import { DeployBootstrapProps } from 'ui/components/buttons/types';
import { findExtension } from 'utils';

export const DeployBootstrapButton = (props: DeployBootstrapProps) => {
  const {
    coreDao,
    title,
    name,
    slug,
    extensions,
    memberAddresses,
    onDeploy,
    ...rest
  } = props;
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const updateBootstrap = useUpdateBootstrap();
  const nftExtension = findExtension(extensions, 'NFT Membership');
  const governanceExtension = findExtension(extensions, 'Governance Token');
  const vaultExtension = findExtension(extensions, 'Vault');
  const investmentClubExtension = findExtension(extensions, 'Investment Club');
  const submissionExtension = findExtension(extensions, 'Submission');
  const votingExtension = findExtension(extensions, 'Voting');

  const deployBootstrap = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        updateBootstrap.mutate({
          contract_address: `${stxAddress}.${slug}`,
          bootstrap_address: `${stxAddress}.${name}`,
          bootstrap_tx_id: data.txId,
        });
        onDeploy?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const extensions = {
      vaultContract: vaultExtension.contract_address,
      governanceTokenContract: governanceExtension.contract_address,
      nftMembershipContract: nftExtension.contract_address,
      investmentClubContract: investmentClubExtension.contract_address,
      submissionContract: submissionExtension.contract_address,
      votingContract: votingExtension.contract_address,
    };
    const codeBody = bootstrapProposal(coreDao, extensions, memberAddresses);
    await openContractDeploy({
      contractName: name,
      codeBody,
      onFinish,
    });
  }, [props]);

  return (
    <Button
      {...rest}
      onClick={deployBootstrap}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {title || 'Deploy'}
    </Button>
  );
};
