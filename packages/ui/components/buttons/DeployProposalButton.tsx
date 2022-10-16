import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { useDAO, useGenerateName } from 'ui/hooks';
import { useCreateProposal } from 'api/clubs/mutations';
import { DeployProposalProps } from 'ui/components/buttons/types';

export const DeployProposalButton = (props: DeployProposalProps) => {
  const { title, description, body, codeBody, onDeploy, ...rest } = props;
  const dao = useDAO();
  const { randomName: contractName } = useGenerateName();
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createProposal = useCreateProposal();
  console.log({ title, description, body });

  const deployProposal = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        createProposal.mutate({
          title: title,
          description: description,
          body: body,
          contract_address: `${stxAddress}.${contractName}`,
          proposed_by: stxAddress as string,
          post_conditions: {},
          tx_id: data.txId,
          club_id: dao?.data?.id,
        });
        onDeploy?.(`${stxAddress}.${contractName}`);
      } catch (e: any) {
        console.error({ e });
      }
    };

    await openContractDeploy({
      contractName,
      codeBody,
      onFinish,
    });
  }, [title, description, body, codeBody]);

  return (
    <Button
      {...rest}
      onClick={deployProposal}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      Deploy
    </Button>
  );
};
