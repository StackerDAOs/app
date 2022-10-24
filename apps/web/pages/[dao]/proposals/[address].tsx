import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Badge,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Progress,
  Stack,
  VStack,
  Text,
} from 'ui';
import { useBlocks, useGovernanceToken, useProposal } from 'ui/hooks';
import { VoteButton } from 'ui/components/buttons';
import { useAccount } from 'ui/components';
import { Card } from 'ui/components/cards';
import { Wrapper } from '@components/containers';
import { AppLayout } from '@components/layout';
import {
  motion,
  FADE_IN_VARIANTS,
  SLIDE_UP_BUTTON_VARIANTS,
} from 'ui/animation';
import { CheckCircle } from 'ui/components/icons';
// import { splitContractAddress } from '@stacks-os/utils';
import { tokenToNumber, getPercentage, estimateDays } from 'utils';

const CurrentBadge = ({
  isConcluded,
  isExecutable,
  isEligible,
  isClosed,
  canExecute,
  isOpen,
  isInactive,
  hasVoted,
  isPassing,
  currentBlockHeight,
  startBlockHeight,
  endBlockHeight,
  executionDelay,
  stxAddress,
}: any) => {
  if (isConcluded) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            Proposal is concluded
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (isExecutable && !isEligible) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            At least required to execute
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (isClosed && !canExecute) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            Open for execution in ~{' '}
            {Number(endBlockHeight) +
              Number(executionDelay) -
              Number(currentBlockHeight)}{' '}
            blocks
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (canExecute && isConcluded) {
    <Badge
      bg='dark.700'
      color='primary.900'
      size='sm'
      border='1px solid'
      borderColor='dark.500'
      borderRadius='lg'
      py='1'
      px='3'
    >
      <HStack>
        <Icon as={CheckCircle} fontSize='0.9rem' />
        <Text fontSize='sm' fontWeight='medium'>
          Ready to {isPassing ? `execute` : `conclude`}
        </Text>
      </HStack>
    </Badge>;
  }

  if (hasVoted) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            Voted
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (isInactive) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            Voting begins in ~{' '}
            {Number(startBlockHeight) - Number(currentBlockHeight)} blocks{' '}
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (!isEligible && stxAddress) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        <HStack>
          <Icon as={CheckCircle} fontSize='0.9rem' />
          <Text fontSize='sm' fontWeight='medium'>
            At least required to vote
          </Text>
        </HStack>
      </Badge>
    );
  }

  if (isOpen) {
    return (
      <Badge
        bg='dark.700'
        color='primary.900'
        size='sm'
        border='1px solid'
        borderColor='dark.500'
        borderRadius='lg'
        py='1'
        px='3'
      >
        Pending
      </Badge>
    );
  }

  return (
    <Badge
      bg='dark.700'
      color='primary.900'
      size='sm'
      border='1px solid'
      borderColor='dark.500'
      borderRadius='lg'
      py='1'
      px='3'
    >
      <HStack>
        <Icon as={CheckCircle} fontSize='0.9rem' />
        <Text fontSize='sm' fontWeight='medium'>
          Inactive
        </Text>
      </HStack>
    </Badge>
  );
};

export default function ProposalView() {
  const { stxAddress } = useAccount();
  const router = useRouter();
  const { address } = router.query as any;
  const { currentBlockHeight } = useBlocks();
  const proposal = useProposal(address);
  const token = useGovernanceToken();
  // const [proposalContractAddress, proposalContractName] = splitContractAddress(
  //   address ? address : '',
  // );

  const isEligible = false; // TODO: check if user is eligible to vote
  const totalVotes =
    Number(proposal?.data?.info?.votesFor) +
    Number(proposal?.data?.info?.votesAgainst);
  const hasVoted = false; // TODO: check if user has voted
  const startBlockHeight = Number(proposal?.data?.info?.startBlockHeight);
  const endBlockHeight = Number(proposal?.data?.info?.endBlockHeight);
  const executionDelay = Number(proposal?.data?.info?.executionDelay);
  const isInactive = currentBlockHeight < startBlockHeight;
  const isClosed = currentBlockHeight > endBlockHeight;
  const isExecutable = currentBlockHeight >= endBlockHeight + executionDelay;
  const canExecute = isEligible && isExecutable;
  const isOpen =
    currentBlockHeight <= endBlockHeight &&
    currentBlockHeight >= startBlockHeight;
  const isConcluded = proposal?.data?.info?.concluded;
  const convertedVotesFor = tokenToNumber(
    Number(proposal?.data?.info?.votesFor),
    Number(token?.data?.decimal),
  );
  const convertedVotesAgainst = tokenToNumber(
    Number(proposal?.data?.info?.votesAgainst),
    Number(token?.data?.decimal),
  );
  const convertedTotalVotes = tokenToNumber(
    Number(totalVotes),
    Number(token?.data?.decimal),
  );
  const isPassing =
    convertedVotesFor > convertedVotesAgainst &&
    convertedTotalVotes >= Number(proposal?.data?.info?.quorumThreshold);

  const proposalStatus = {
    isEligible,
    hasVoted,
    isInactive,
    isClosed,
    isExecutable,
    canExecute,
    isOpen,
    isConcluded,
    isPassing,
    startBlockHeight,
    endBlockHeight,
    executionDelay,
    stxAddress,
  };

  if (proposal?.isLoading) {
    return null;
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Wrapper>
        <Stack spacing='8' pb='16' mt='6'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.25, type: 'linear' }}
          >
            <Stack spacing='6'>
              <Box py='6' my='6'>
                <Grid
                  templateColumns='repeat(5, 1fr)'
                  gap='10'
                  alignItems='flex-start'
                >
                  <GridItem colSpan={3}>
                    <VStack
                      spacing='6'
                      align='left'
                      direction={{ base: 'column', md: 'row' }}
                      justify='space-between'
                      color='white'
                    >
                      <Stack spacing='6'>
                        <Stack spacing='2'>
                          <HStack>{CurrentBadge(proposalStatus)}</HStack>
                          <Heading
                            fontSize='4xl'
                            fontWeight='black'
                            color='light.900'
                          >
                            {proposal?.data?.details?.submission?.title}
                          </Heading>
                          <Text
                            color='light.500'
                            fontSize='lg'
                            fontWeight='regular'
                          >
                            {proposal?.data?.details?.submission?.description}
                          </Text>
                        </Stack>
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                        >
                          <Stack mt='2' spacing='3'>
                            <Stack>
                              <Text
                                color='gray'
                                fontSize='sm'
                                fontWeight='semibold'
                              >
                                Yes ({convertedVotesFor})
                              </Text>
                              <Progress
                                colorScheme='primary'
                                borderRadius='lg'
                                size='md'
                                value={getPercentage(
                                  totalVotes,
                                  Number(proposal?.data?.info?.votesFor),
                                )}
                                bg='dark.500'
                              />
                            </Stack>
                            <Stack>
                              <Text
                                color='gray'
                                fontSize='sm'
                                fontWeight='semibold'
                              >
                                No ({convertedVotesAgainst})
                              </Text>
                              <Progress
                                colorScheme='whiteAlpha'
                                borderRadius='lg'
                                size='md'
                                value={getPercentage(
                                  totalVotes,
                                  Number(proposal?.data?.info?.votesAgainst),
                                )}
                                bg='dark.500'
                              />
                            </Stack>
                            <Stack>
                              <Text
                                color='gray'
                                fontSize='sm'
                                fontWeight='semibold'
                              >
                                Quorum (
                                {convertedVotesFor + convertedVotesAgainst})
                              </Text>
                              <Progress
                                colorScheme='gray'
                                borderRadius='lg'
                                size='md'
                                value={getPercentage(
                                  Number(proposal?.data?.info?.quorumThreshold),
                                  convertedVotesFor + convertedVotesAgainst,
                                )}
                                bg='dark.500'
                              />
                            </Stack>
                          </Stack>
                        </motion.div>
                      </Stack>
                      <motion.div
                        variants={SLIDE_UP_BUTTON_VARIANTS}
                        initial={SLIDE_UP_BUTTON_VARIANTS.hidden}
                        animate={SLIDE_UP_BUTTON_VARIANTS.enter}
                        exit={SLIDE_UP_BUTTON_VARIANTS.exit}
                        transition={{ duration: 0.85, type: 'linear' }}
                      >
                        <HStack
                          width='full'
                          mt='5'
                          justifyContent='flex-start'
                          spacing='6'
                        >
                          <VoteButton
                            text='Approve'
                            color='light.900'
                            bg='primary.900'
                            isFullWidth
                            proposalPrincipal={address || ''}
                            voteFor
                            _hover={{ opacity: 0.9 }}
                            _active={{ opacity: 1 }}
                            _disabled={{
                              bg: 'primary.900',
                              opacity: 0.5,
                              cursor: 'not-allowed',
                              _hover: {
                                bg: 'primary.900',
                                opacity: 0.5,
                                cursor: 'not-allowed',
                              },
                            }}
                          />
                          <VoteButton
                            text='Reject'
                            color='light.900'
                            bg='dark.600'
                            isFullWidth
                            proposalPrincipal={address || ''}
                            voteFor={false}
                            _hover={{ opacity: 0.9 }}
                            _active={{ opacity: 1 }}
                            _disabled={{
                              bg: 'dark.600',
                              opacity: 0.5,
                              cursor: 'not-allowed',
                              _hover: {
                                bg: 'dark.600',
                                opacity: 0.5,
                                cursor: 'not-allowed',
                              },
                            }}
                          />
                        </HStack>
                      </motion.div>
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Card
                      bg='dark.900'
                      border='1px solid'
                      borderColor='dark.500'
                    >
                      <Box
                        py={{ base: '3', md: '3' }}
                        px={{ base: '6', md: '6' }}
                        bg='dark.700'
                        borderTopLeftRadius='lg'
                        borderTopRightRadius='lg'
                      >
                        <HStack justify='space-between'>
                          <Text
                            fontSize='sm'
                            fontWeight='medium'
                            color='light.900'
                          >
                            Voting power
                          </Text>
                          {/* <Text color='light.900' fontWeight='regular'>
                        {convertToken(
                          defaultTo(balance, 0)?.toString(),
                          Number(token?.decimals),
                        )}{' '}
                        <Text as='span' color='gray.900' fontWeight='medium'>
                          {token?.symbol}
                        </Text>
                      </Text> */}
                        </HStack>
                      </Box>
                      <Divider borderColor='dark.500' />
                      <Stack
                        spacing={{ base: '0', md: '1' }}
                        justify='center'
                        py={{ base: '3', md: '3' }}
                        px={{ base: '6', md: '6' }}
                      >
                        <Stack spacing='5'>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              Start Block
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {Number(proposal?.data?.info?.startBlockHeight)}
                            </Text>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              End Block
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {/* TODO: get executionDelay from voting
                            contracts and add to endBlockHeight */}
                              {Number(proposal?.data?.info?.endBlockHeight)}
                            </Text>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              Execution Block
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {/* TODO: get executionDelay from voting
                            contracts and add to endBlockHeight */}
                              {Number(proposal?.data?.info?.endBlockHeight) +
                                Number(proposal?.data?.info?.executionDelay)}
                            </Text>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              Quorum
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {parseInt(
                                proposal?.data?.info?.quorumThreshold,
                                10,
                              )?.toLocaleString('en-US')}{' '}
                              {token?.data?.symbol}
                            </Text>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              Voting Begins
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {Number(currentBlockHeight) <
                              Number(proposal?.data?.info?.startBlockHeight)
                                ? `~ ${estimateDays(
                                    Number(
                                      proposal?.data?.info?.startBlockHeight,
                                    ) - Number(currentBlockHeight),
                                  )} days`
                                : `Now`}
                            </Text>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='gray'
                            >
                              Vote Deadline
                            </Text>
                            <Text
                              fontSize='sm'
                              fontWeight='medium'
                              color='light.900'
                            >
                              {Number(currentBlockHeight) >
                              Number(proposal?.data?.info?.endBlockHeight)
                                ? `Closed`
                                : `~ ${estimateDays(
                                    Number(
                                      proposal?.data?.info?.endBlockHeight,
                                    ) - Number(currentBlockHeight),
                                  )} days`}
                            </Text>
                          </HStack>
                        </Stack>
                      </Stack>
                    </Card>
                  </GridItem>
                </Grid>
              </Box>
            </Stack>
          </motion.div>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

ProposalView.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
