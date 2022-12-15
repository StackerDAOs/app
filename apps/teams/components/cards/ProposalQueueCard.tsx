import React from 'react';
import { StacksSDK } from 'sdk';
import {
  Button,
  Circle,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useToast,
} from 'ui';
import { useAccount } from 'ui/components';
import { useTeam, useTransaction } from 'ui/hooks';
import { useCreateProposal } from 'api/teams/mutations';
import { truncateAddress } from '@stacks-os/utils';
import { findExtension, getExplorerLink } from 'utils';
import { CheckCircle, XIcon } from 'ui/components/icons';

export const ProposalQueueCard = ({ submission }: any) => {
  const {
    title,
    contract_address: contractAddress,
    tx_id: transactionId,
  } = submission;
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
    <HStack
      justify='space-between'
      py={{ base: '6', md: '6' }}
      px={{ base: '6', md: '6' }}
      borderBottomWidth='1px'
      borderBottomColor='dark.500'
      _last={{ borderBottomWidth: '0' }}
    >
      <HStack spacing='2'>
        <HStack align='flex-start' spacing='4'>
          <Stack spacing='2' maxW='lg'>
            <Tag
              color='yellow.500'
              bg='dark.800'
              alignSelf='self-start'
              size='sm'
              borderRadius='3xl'
            >
              <Text as='span' fontWeight='regular'>
                {truncateAddress(contractAddress)}
              </Text>
            </Tag>
            <Heading size='sm' fontWeight='regular'>
              {title}
            </Heading>
          </Stack>
        </HStack>
      </HStack>
      <>
        {!transaction?.data && (
          <Button variant='link' size='sm' isDisabled>
            Inactive
          </Button>
        )}
        {transaction?.data?.tx_status === 'pending' && (
          <HStack spacing='2'>
            <Circle size='2' bg='yellow.500' color='white' />
            <Text
              fontSize='sm'
              fontWeight='medium'
              color='light.900'
              letterSpacing='tight'
            >
              Deploying
            </Text>
          </HStack>
        )}
        {transaction?.data?.tx_status === 'success' && (
          <Button variant='secondary' size='sm' onClick={submitProposal}>
            Submit as proposal
          </Button>
        )}
      </>
    </HStack>
  );
};
