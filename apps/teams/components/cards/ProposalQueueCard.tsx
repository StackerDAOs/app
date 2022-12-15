import React from 'react';
import { StacksSDK } from 'sdk';
import {
  Button,
  Circle,
  Grid,
  GridItem,
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

export const ProposalQueueCard = (submission: any) => {
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
  console.log({
    title,
    contractAddress,
    transactionId,
    multisigExtension,
    sdk,
    transaction,
  });
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={8} alignItems='center'>
      <GridItem colSpan={{ base: 2, md: 4 }}>
        <Stack spacing='2'>
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
          <HStack align='flex-start' spacing='4'>
            <Stack spacing='1' maxW='lg'>
              <Heading size='xs' fontWeight='black'>
                {title}
              </Heading>
            </Stack>
          </HStack>
        </Stack>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 1 }}>
        <Button
          variant='secondary'
          size='sm'
          onClick={() =>
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
                                <Circle
                                  size='8'
                                  bg='dark.500'
                                  borderRadius='3xl'
                                >
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
            })
          }
        >
          Submit
        </Button>
      </GridItem>
    </Grid>
  );
};
