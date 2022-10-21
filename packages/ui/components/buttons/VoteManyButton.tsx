import React from 'react';
import { Button, Icon, Spinner, useToast } from 'ui';
import {
  useOpenContractCall,
  trueCV,
  falseCV,
  contractPrincipalCV,
  listCV,
  tupleCV,
  noneCV,
} from 'ui/components';

// import { TxToast } from '@components/feedback';
import {
  generateWithDelegators,
  getDelegators,
  getExplorerLink,
  contractPrincipal,
} from 'utils';
import { useExtension, useTransaction } from 'ui/hooks';
import { size } from 'lodash';
import { VoteProposalProps } from './types';
import { CheckCircle } from 'ui/components/icons';

export const VoteManyButton = (props: VoteProposalProps) => {
  // const toast = useToast();
  const { text, proposalPrincipal, voteFor } = props;
  const [transactionId, setTransactionId] = React.useState('');
  const { data: voting } = useExtension('Voting');
  const { data: transaction } = useTransaction(transactionId);
  const { openContractCall, isRequestPending } = useOpenContractCall();
  const [proposalContractAddress, proposalContractName] =
    contractPrincipal(proposalPrincipal);

  const handleVote = React.useCallback(async () => {
    const delegatorAddresses: string[] = [];
    const delegateVote = listCV([
      tupleCV({
        for: voteFor ? trueCV() : falseCV(),
        proposal: contractPrincipalCV(
          proposalContractAddress,
          proposalContractName,
        ),
        delegator: noneCV(),
      }),
    ]);
    const delegators = getDelegators({
      voteFor,
      proposalContractAddress,
      proposalContractName,
      delegatorAddresses,
    });
    const hasDelegators = size(delegators) > 0;
    const functionArgs = hasDelegators
      ? [
          listCV(
            generateWithDelegators({
              voteFor,
              proposalContractAddress,
              proposalContractName,
              delegators,
            }),
          ),
        ]
      : [delegateVote];
    const [contractAddress, contractName] = contractPrincipal(
      voting?.contract_address,
    );
    const functionName = 'vote-many';
    const postConditions: any = [];

    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditions,
      onFinish,
      onCancel: () => {
        console.log('Cancelled vote');
      },
    });
  }, [proposalPrincipal]);

  const onFinish = async (data: any) => {
    setTransactionId(data.txId);
    // toast({
    //   duration: 5000,
    //   position: 'bottom-right',
    //   isClosable: true,
    //   render: () => (
    //     <TxToast
    //       message='Transaction submitted'
    //       body={`Your vote to ${decisionText} has been submitted`}
    //       url={getExplorerLink(data.txId)}
    //       closeAll={toast.closeAll}
    //     />
    //   ),
    // });
  };

  const isPending = transaction?.tx_status === 'pending';
  const isSuccessful = transaction?.tx_status === 'success';
  const isDisabled = isRequestPending || isPending || isSuccessful;

  return (
    <Button {...props} onClick={handleVote} disabled={isDisabled}>
      {isPending ? (
        <Spinner size='xs' />
      ) : isSuccessful ? (
        <Icon as={CheckCircle} color='light.900' />
      ) : (
        text
      )}
    </Button>
  );
};
