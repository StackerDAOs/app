import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useOpenContractCall } from '@micro-stacks/react';
import { useExtension } from 'ui/hooks';
// import { useCreateProposal } from 'api/clubs/mutations';
import { SubmitProposalProps } from 'ui/components/buttons/types';
import { contractPrincipalCV, uintCV } from 'micro-stacks/clarity';
import {
  splitContractAddress,
  validateContractAddress,
} from '@stacks-os/utils';

export const SubmitProposalButton = (props: SubmitProposalProps) => {
  const { proposalContractAddress, onSubmit, ...rest } = props;
  // const dao = useDAO();
  const submissionExtension = useExtension('Submission');
  const { openContractCall } = useOpenContractCall();
  // const { stxAddress } = useAccount();
  // const createProposal = useCreateProposal();
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
        // createProposal.mutate({
        //   title: title,
        //   description: description,
        //   body: body,
        //   contract_address: `${stxAddress}.${contractName}`,
        //   proposed_by: stxAddress as string,
        //   post_conditions: {},
        //   tx_id: data.txId,
        //   club_id: dao?.data?.id,
        // });
        onSubmit?.(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const functionArgs = [
      contractPrincipalCV(contractAddress, contractName),
      uintCV(144),
    ];
    const functionName = 'propose';
    const postConditions: any = [];

    if (validateContractAddress(contractAddress)) {
      await openContractCall({
        contractAddress: submissionContractAddress,
        contractName: submissionContractName,
        functionName,
        functionArgs,
        postConditions,
        onFinish,
      });
    }
  }, [props]);

  return (
    <Button
      {...rest}
      onClick={submitProposal}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      Deploy
    </Button>
  );
};
