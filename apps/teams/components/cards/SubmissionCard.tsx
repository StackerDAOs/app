import React from 'react';
import { StacksSDK } from 'sdk';
import {
  Button,
  Circle,
  HStack,
  Icon,
  Stack,
  Square,
  Tag,
  Text,
  useToast,
} from 'ui';
import { useAccount } from 'ui/components';
import { useTeam, useTransaction } from 'ui/hooks';
import { useCreateProposal } from 'api/teams/mutations';
import { findExtension, getExplorerLink } from 'utils';
import { CheckCircle, UndoIcon, XIcon } from 'ui/components/icons';

export const SubmissionCard = ({ submission }: any) => {
  const { contract_address: contractAddress, tx_id: transactionId } =
    submission;
  const dao = useTeam();
  const { stxAddress } = useAccount();
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const sdk = new StacksSDK(dao?.data?.contract_address);
  const createProposal = useCreateProposal();
  const toast = useToast();
  const transaction = useTransaction(transactionId);

  const submitProposal = () =>
    sdk.submit({
      extensionAddress: multisigExtension?.contract_address,
      proposalAddress: contractAddress,
      onFinish(payload) {
        const { txId } = payload;
        createProposal.mutate(
          {
            contract_address: contractAddress,
            proposed_by: stxAddress as string,
            tx_id: txId,
          },
          {
            onSuccess: () => {
              const href = getExplorerLink(txId);
              toast({
                duration: 5000,
                position: 'bottom-right',
                isClosable: true,
                render: () => (
                  <Stack
                    direction='row'
                    justify='space-between'
                    py='2'
                    px='3'
                    spacing='3'
                    bg='dark.800'
                    borderRadius='3xl'
                    borderColor='dark.500'
                    borderWidth='1px'
                  >
                    <Stack spacing='2'>
                      <Stack spacing='3' direction='row' align='center'>
                        <Circle size='8' bg='dark.500' borderRadius='3xl'>
                          <Icon
                            as={CheckCircle}
                            color='primary.500'
                            boxSize='5'
                          />
                        </Circle>
                        <a href={href} target='_blank' rel='noreferrer'>
                          <Button variant='link' size='sm'>
                            View transaction
                          </Button>
                        </a>
                      </Stack>
                    </Stack>
                    <Button variant='link' size='sm'>
                      <Icon
                        as={XIcon}
                        color='light.900'
                        boxSize='5'
                        onClick={() => toast.closeAll()}
                      />
                    </Button>
                  </Stack>
                ),
              });
            },
          },
        );
      },
    });

  return (
    <Stack
      key={submission?.id}
      direction='row'
      spacing='2'
      justify='space-between'
      align='center'
      py='6'
      borderBottomWidth='1px'
      borderBottomColor='dark.500'
      _first={{
        borderTopWidth: '1px',
        borderTopColor: 'dark.500',
      }}
    >
      <Stack spacing='1'>
        <HStack spacing='2' align='center'>
          {transaction?.data?.tx_status === 'pending' && (
            <Tag
              color='orange.500'
              bg='dark.800'
              alignSelf='self-start'
              size='sm'
              borderRadius='3xl'
            >
              <Text as='span' fontWeight='regular'>
                Deploying
              </Text>
            </Tag>
          )}
          {transaction?.data?.tx_status === 'success' && (
            <Tag
              color='green.500'
              bg='dark.800'
              alignSelf='self-start'
              size='sm'
              borderRadius='3xl'
            >
              <Text as='span' fontWeight='regular'>
                Ready for submission
              </Text>
            </Tag>
          )}
          {transaction?.data?.tx_status === 'abort_by_response' && (
            <Tag
              color='red.500'
              bg='dark.800'
              alignSelf='self-start'
              size='sm'
              borderRadius='3xl'
            >
              <Text as='span' fontWeight='regular'>
                Failed
              </Text>
            </Tag>
          )}
        </HStack>
        <Text fontSize='md' fontWeight='semibold' color='light.900'>
          {submission?.title}
        </Text>
      </Stack>
      {transaction?.data?.tx_status === 'pending' && (
        <Button variant='dark' isLoading />
      )}
      {transaction?.data?.tx_status === 'success' && (
        <Button variant='secondary' size='sm' onClick={submitProposal}>
          Submit proposal
        </Button>
      )}
      {transaction?.data?.tx_status === 'abort_by_response' && (
        <HStack>
          <Square size='8' bg='dark.500' color='inverted' borderRadius='lg'>
            <Icon as={UndoIcon} boxSize='4' />
          </Square>
        </HStack>
      )}
    </Stack>
  );
};
