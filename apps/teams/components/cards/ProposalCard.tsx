import React from 'react';
import Link from 'next/link';
import { Box, Button, Circle, HStack, Progress, Stack, Text } from 'ui';
import { useTeam, useTeamProposal, useTransaction } from 'ui/hooks';
import Avatar from 'boring-avatars';
import { getPercentage } from 'utils';
import { truncateAddress } from '@stacks-os/utils';

export const ProposalCard = ({ proposal }: any) => {
  const { tx_id: transactionId } = proposal;
  const dao = useTeam();
  const proposalData = useTeamProposal(proposal?.contract_address);
  const transaction = useTransaction(transactionId);
  let status = '';
  const signalsReceived = proposalData?.data?.signalsReceived ?? 0;
  const signalsRequired = proposalData?.data?.signalsRequired ?? 0;

  if (transaction?.data?.tx_status === 'pending') {
    status = 'pending';
  } else if (
    transaction?.data?.tx_status === 'success' &&
    signalsReceived < signalsRequired
  ) {
    status = 'active';
  } else {
    status = 'executed';
  }

  return (
    <Link href={`/${dao?.data?.slug}/proposals/${proposal?.contract_address}`}>
      <Stack
        key={proposal?.id}
        direction='row'
        spacing='2'
        justify='space-between'
        py='6'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        _first={{
          borderTopWidth: '1px',
          borderTopColor: 'dark.500',
        }}
        _hover={{
          cursor: 'pointer',
        }}
      >
        <HStack spacing='3'>
          <Text fontSize='md' fontWeight='regular' color='gray'>
            {proposal?.id.toString().padStart(3, '0')}
          </Text>
          <Text fontSize='md' fontWeight='semibold' color='light.900'>
            {proposal?.submission?.title}
          </Text>
          <HStack spacing='2' align='center'>
            <Avatar
              size={15}
              name={proposal?.proposed_by}
              variant='beam'
              colors={['#624AF2', '#7301fa', '#eb00ff', '#27cb9f']}
            />
            <Text fontSize='sm' color='gray' fontWeight='regular'>
              {truncateAddress(proposal?.proposed_by)}
            </Text>
          </HStack>
        </HStack>
        <HStack spacing='6'>
          <HStack spacing='3'>
            <Text>
              {proposalData?.data?.signalsReceived}/
              {proposalData?.data?.signalsRequired}
            </Text>
            <Box>
              <Progress
                colorScheme='secondary'
                borderRadius='lg'
                size='sm'
                value={getPercentage(signalsRequired, signalsReceived)}
                bg='dark.500'
                w='10vw'
              />
            </Box>
          </HStack>
          <Button variant='dark' size='sm'>
            {status === 'pending' && (
              <HStack justify='space-between' spacing='3'>
                <Circle size='2' bg='yellow.500' borderRadius='3xl' />
                <Text color='light.500'>Pending</Text>
              </HStack>
            )}
            {status === 'active' && (
              <HStack justify='space-between' spacing='3'>
                <Circle size='2' bg='green.500' borderRadius='3xl' />
                <Text color='light.500'>Awaiting approval</Text>
              </HStack>
            )}
            {status === 'executed' && (
              <HStack justify='space-between' spacing='3'>
                <Circle size='2' bg='secondary.500' borderRadius='3xl' />
                <Text color='light.500'>Executed</Text>
              </HStack>
            )}
          </Button>
        </HStack>
      </Stack>
    </Link>
  );
};
