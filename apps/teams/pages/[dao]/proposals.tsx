import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from 'ui';
import { useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { ProposalCard, ProposalQueueCard } from '@components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { SectionHeader } from 'ui/components/layout';
import { ConnectButton } from 'ui/components/buttons';
import { CreateProposal } from '@components/drawers';
import {
  useTeam,
  useTeamProposals,
  useTeamSubmissions,
  useTeamTransactions,
} from 'ui/hooks';
import { findExtension, getExplorerLink } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { capitalize, map } from 'lodash';
import { useActivateTeam } from 'api/teams/mutations';
import { InfoIcon, TransferIcon } from 'ui/components/icons';

const MotionGrid = motion(SimpleGrid);

export default function Proposals() {
  const [filter, setFilter] = React.useState('active');
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const dao = useTeam();
  const isActive = dao?.data?.active;
  const activate = useActivateTeam();
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const transactions = useTeamTransactions(
    multisigExtension?.contract_address,
    'team',
  );
  const proposals = useTeamProposals();
  const submissions = useTeamSubmissions();

  if (dao?.isLoading && dao?.isFetching) {
    return null;
  }

  if (!isActive) {
    return (
      <Stack align='center' justify='center' h='75vh'>
        <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='25vw'>
          <Box
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
            bg='dark.700'
            borderTopLeftRadius='lg'
            borderTopRightRadius='lg'
          >
            <HStack justify='center'>
              <Text fontSize='md' fontWeight='medium' color='light.900'>
                Dashboard is not active yet
              </Text>
            </HStack>
          </Box>
          <Stack
            spacing={{ base: '0', md: '1' }}
            justify='center'
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
          >
            <Stack spacing='3'>
              <HStack justify='center' cursor='default'>
                <Button
                  variant='default'
                  size='sm'
                  onClick={() => {
                    activate.mutate({
                      contract_address: dao?.data?.contract_address,
                    });
                  }}
                  isLoading={activate.isLoading}
                >
                  Activate
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  }

  if (!isSignedIn) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack align='center' textAlign='center' spacing='3'>
            <Stack spacing='1'>
              <Heading size='md' fontWeight='light'>
                Connect your wallet
              </Heading>
              <Text color='gray' maxW='md'>
                Sign in to verify your membership and access to the Club.
              </Text>
            </Stack>
            <ConnectButton
              variant='default'
              size='md'
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
            />
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  if (!dao?.data) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack align='center' textAlign='center' spacing='3'>
            <Stack spacing='1'>
              <Heading size='md' fontWeight='light'>
                No clubs found for{' '}
                <Text
                  as='span'
                  fontWeight='black'
                  bgGradient='linear(to-br, primary.900 25%, primary-accent.900 100%)'
                  bgClip='text'
                >
                  {router.query?.dao}
                </Text>
              </Heading>
              <Text color='gray' maxW='md'>
                Make sure you have the correct Club name and try again.
              </Text>
            </Stack>
            <Link href='/create'>
              <Button variant='default'>Create a Club</Button>
            </Link>
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing='8'>
            <Grid templateColumns='repeat(9, 1fr)' gap={6}>
              <GridItem colSpan={5}>
                <Stack spacing='3'>
                  <Card
                    bg='dark.900'
                    border='1px solid'
                    borderColor='dark.500'
                    h='fit-content'
                  >
                    <Box
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      bg='dark.700'
                      borderTopLeftRadius='lg'
                      borderTopRightRadius='lg'
                    >
                      <HStack spacing='2'>
                        <Tooltip
                          label='The proposal queue is a list of proposal contracts waiting to be confirmed by the Stacks blockchain. Once confirmed, you can submit these contracts as proposals. They will be available for voting based on the rules of your Team.'
                          fontSize='sm'
                          bg='dark.800'
                          borderColor='dark.500'
                          borderWidth='1px'
                          p='3'
                          shouldWrapChildren
                        >
                          <InfoIcon />
                        </Tooltip>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          Proposal Queue
                        </Text>
                      </HStack>
                    </Box>
                    <Stack
                      spacing={{ base: '0', md: '1' }}
                      justify='center'
                      h={submissions?.data?.length === 0 ? '30vh' : 'auto'}
                    >
                      <Stack spacing='3'>
                        {submissions?.data?.length === 0 && (
                          <Stack
                            spacing='3'
                            py={{ base: '3', md: '3' }}
                            px={{ base: '6', md: '6' }}
                            justify='center'
                            align='center'
                            cursor='default'
                          >
                            <Text fontSize='md' fontWeight='light' color='gray'>
                              No proposals in the queue
                            </Text>
                            <CreateProposal
                              title='Create proposal'
                              variant='secondary'
                              size='sm'
                              isDisabled={!isActive}
                              _hover={{ opacity: 0.9 }}
                            />
                          </Stack>
                        )}
                        {submissions?.data?.length !== 0 && (
                          <Stack spacing='0'>
                            {submissions?.data?.map((data: any) => (
                              <ProposalQueueCard
                                key={data?.submission?.tx_id}
                                submission={data}
                              />
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </GridItem>
              <GridItem colSpan={4}>
                <Card bg='dark.800' h='fit-content'>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='6'
                  >
                    <Heading
                      color='light.900'
                      fontSize='lg'
                      fontWeight='regular'
                      letterSpacing='tight'
                    >
                      Recent Activity
                    </Heading>
                    {transactions?.data?.length !== 0 &&
                      transactions?.data?.map((transaction: any) => (
                        <Stack spacing='6' justify='center' h='full'>
                          <HStack justify='space-between'>
                            <HStack spacing='2'>
                              <Circle
                                size='5'
                                bg='dark.800'
                                borderWidth='1px'
                                borderColor='dark.500'
                              >
                                <Icon
                                  as={TransferIcon}
                                  boxSize='2'
                                  color='primary.900'
                                />
                              </Circle>
                              <Text
                                fontSize='sm'
                                fontWeight='medium'
                                color='light.900'
                              >
                                {truncateAddress(transaction?.txId)}
                              </Text>
                            </HStack>
                            <a
                              href={getExplorerLink(transaction?.txId)}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <Text
                                fontSize='sm'
                                fontWeight='regular'
                                color='gray'
                                cursor='pointer'
                              >
                                View transaction
                              </Text>
                            </a>
                          </HStack>
                        </Stack>
                      ))}
                    {transactions?.data?.length === 0 && (
                      <Stack
                        spacing='3'
                        justify='center'
                        align='center'
                        h='15vh'
                        cursor='default'
                      >
                        <Text fontSize='md' fontWeight='light' color='gray'>
                          No recent activity
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </Card>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
          <GridItem colSpan={6}>
            <Stack spacing='8' pb='16' mt='6'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack py={{ base: '6', md: '6' }} spacing='6'>
                  <SectionHeader
                    justify={{ base: 'flex-start', md: 'space-between' }}
                    align={{ base: 'flex-start', md: 'space-between' }}
                    color='light.900'
                  >
                    <Stack spacing='3'>
                      <Heading
                        color='light.900'
                        fontSize='xl'
                        fontWeight='medium'
                        letterSpacing='tight'
                      >
                        Proposals
                      </Heading>
                    </Stack>
                    <Stack align='center' direction='row' spacing='3'>
                      <RadioGroup onChange={setFilter} value={filter}>
                        <Stack direction='row'>
                          {map(
                            ['active', 'pending', 'executed'],
                            (tab: string) => (
                              <Radio
                                size='sm'
                                value={tab}
                                _focus={{ outline: 'none' }}
                              >
                                {capitalize(tab)}
                              </Radio>
                            ),
                          )}
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </SectionHeader>
                  {proposals?.data?.length === 0 && (
                    <Stack
                      spacing='3'
                      justify='center'
                      align='center'
                      cursor='default'
                    >
                      <Text fontSize='md' fontWeight='light' color='gray'>
                        No proposals found
                      </Text>
                    </Stack>
                  )}
                  <MotionGrid
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.5, type: 'linear' }}
                    columns={{ base: 1, md: 2, lg: 2 }}
                    spacing='6'
                    color='white'
                  >
                    {map(proposals?.data, (data: any) => (
                      <ProposalCard {...data} />
                    ))}
                  </MotionGrid>
                </Stack>
              </motion.div>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </motion.div>
  );
}

const Header = () => {
  const dao = useTeam();
  const isActive = dao?.data?.active;

  return (
    <Flex justify='space-between' align='center' py='6' px='4'>
      <Heading size='lg' fontWeight='black' letterSpacing='tight'>
        Proposals
      </Heading>
      <CreateProposal
        title='Create proposal'
        variant='secondary-inverted'
        size='sm'
        isDisabled={!isActive}
        _hover={{ opacity: 0.9 }}
      />
    </Flex>
  );
};

Proposals.getLayout = (page: any) => (
  <DashboardLayout header={<Header />}>{page}</DashboardLayout>
);
