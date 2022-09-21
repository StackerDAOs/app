import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { bootstrapProposal } from 'utils/contracts/bootstrap';
import { useUpdateBootstrap } from 'api/clubs/mutations';
import { DeployBootstrapProps } from 'ui/components/buttons/types';
import { findExtension } from 'utils';

export const DeployBootstrapButton = (props: DeployBootstrapProps) => {
  const { extensions } = props;
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
          contract_address: `${stxAddress}.${props?.slug}`,
          bootstrap_address: `${stxAddress}.letsfngooo`,
        });
        props?.onFinish(data);
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
    const codeBody = bootstrapProposal(extensions, [
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      'ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50',
      'ST2Y2SFNVZBT8SSZ00XXKH930MCN0RFREB2GQG7CJ',
      'STPJ2HPED2TMR1HAFBFA5VQF986CRD4ZWHH36F6X',
      'ST2GG57WCVCS6AAVSKRHSKP10HJTQZ0M4AVTM0NAQ',
    ]);
    await openContractDeploy({
      contractName: 'letsfngooo',
      codeBody,
      onFinish,
    });
  }, [props]);

  return (
    <Button
      {...props}
      onClick={deployBootstrap}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {props?.title || 'Deploy'}
    </Button>
  );
};
