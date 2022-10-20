import React from 'react';
import { Button } from 'ui';
import {
  useAccount,
  useOpenContractCall,
  contractPrincipalCV,
  uintCV,
} from 'ui/components';
import { useExtension } from 'ui/hooks';
import { useCreateProposal } from 'api/clubs/mutations';
import { SubmitProposalProps } from 'ui/components/buttons/types';
import {
  splitContractAddress,
  validateContractAddress,
} from '@stacks-os/utils';

export const SubmitProposalButton = (props: SubmitProposalProps) => {
  const { proposalContractAddress, onSubmit, ...rest } = props;
  const submissionExtension = useExtension('Submission');
  const { openContractCall } = useOpenContractCall();
  const { stxAddress } = useAccount();
  const createProposal = useCreateProposal();
  // const startBlockHeight =
  //   currentBlockHeight + Number(submissionData?.minimumProposalStartDelay) + 25; // TODO: pull in submission data and add block delay param
  const [contractAddress, contractName] = splitContractAddress(
    proposalContractAddress ?? '',
  );
  const [submissionContractAddress, submissionContractName] =
    splitContractAddress(submissionExtension?.data?.contract_address ?? '');

  const submitProposal = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        createProposal.mutate({
          contract_address: proposalContractAddress,
          proposed_by: stxAddress as string,
          tx_id: data.txId,
        });
        onSubmit?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const functionArgs = [
      contractPrincipalCV(contractAddress, contractName),
      uintCV(650),
      uintCV(1), // TODO: pass tokenID
    ];
    const functionName = 'propose';
    const postConditions: any = [];

    await openContractCall({
      contractAddress: submissionContractAddress,
      contractName: submissionContractName,
      functionName,
      functionArgs,
      postConditions,
      onFinish,
    });
  }, [proposalContractAddress]);

  return (
    <Button
      {...rest}
      onClick={submitProposal}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      Submit
    </Button>
  );
};
