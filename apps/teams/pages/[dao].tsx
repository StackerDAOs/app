import React from 'react';
import Link from 'next/link';
import { StacksSDK } from 'sdk';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Heading,
  HStack,
  Progress,
  Stack,
  Tag,
  Text,
} from 'ui';
import { useAccount, useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { ConnectButton } from 'ui/components/buttons';
import { CreateProposal } from '@components/drawers';
import {
  useTeam,
  useTeamTransactions,
  useTeamProposals,
  useTeamSubmissions,
} from 'ui/hooks';
import { findExtension } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { size } from 'lodash';
import { TransactionTable } from '@components/tables';
import { useActivateTeam, useCreateProposal } from 'api/teams/mutations';

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const dao = useTeam();
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const transactions = useTeamTransactions(
    vaultExtension?.contract_address,
    'vault',
  );
  const isActive = dao?.data?.active;
  const activate = useActivateTeam();

  const sdk = new StacksSDK(dao?.data?.contract_address);
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const proposals = useTeamProposals();
  const submissions = useTeamSubmissions();
  const createProposal = useCreateProposal();

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
              <GridItem colSpan={4}>
                <Stack spacing='3'>
                  <Card bg='dark.900' border='1px solid'>
                    <Box
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      bg='dark.900'
                      borderTopLeftRadius='lg'
                      borderTopRightRadius='lg'
                    >
                      <HStack justify='space-between'>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          Latest Proposal
                        </Text>
                      </HStack>
                    </Box>
                    <Stack
                      spacing={{ base: '0', md: '1' }}
                      justify='center'
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      h={proposals?.data?.length === 0 ? '30vh' : 'auto'}
                    >
                      <Stack spacing='3'>
                        {proposals?.data?.length === 0 && (
                          <HStack justify='center' cursor='default'>
                            <Text fontSize='md' fontWeight='light' color='gray'>
                              No Proposals found
                            </Text>
                          </HStack>
                        )}
                        {proposals?.data?.length !== 0 && (
                          <Stack spacing='6' py='3'>
                            {proposals?.data?.map(({ submission }: any) => (
                              <Stack>
                                <Box>
                                  <Stack>
                                    <Text fontSize='sm' color='light.500'>
                                      {submission.title}
                                    </Text>
                                    <Stack direction='row' align='baseline'>
                                      <Heading size='md'>1</Heading>
                                      <Text
                                        aria-hidden
                                        fontWeight='semibold'
                                        color='muted'
                                      >
                                        / 3
                                      </Text>
                                      <Box srOnly>out of 3</Box>
                                    </Stack>
                                  </Stack>
                                </Box>
                                <Progress
                                  value={(100 / 200) * 100}
                                  size='xs'
                                  borderRadius='none'
                                  colorScheme='secondary'
                                  bg='dark.500'
                                />
                              </Stack>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </GridItem>
              <GridItem colSpan={5}>
                <Stack spacing='3'>
                  <Card bg='dark.900' border='1px solid' borderColor='dark.500'>
                    <Box
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      bg='dark.700'
                      borderTopLeftRadius='lg'
                      borderTopRightRadius='lg'
                    >
                      <HStack justify='space-between'>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          Submissions
                        </Text>
                      </HStack>
                    </Box>
                    <Stack
                      spacing={{ base: '0', md: '1' }}
                      justify='center'
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      h={submissions?.data?.length === 0 ? '30vh' : 'auto'}
                    >
                      <Stack spacing='3'>
                        {submissions?.data?.length === 0 && (
                          <HStack justify='center' cursor='default'>
                            <Text fontSize='md' fontWeight='light' color='gray'>
                              No Submissions found
                            </Text>
                          </HStack>
                        )}
                        {submissions?.data?.length !== 0 && (
                          <Stack spacing='6' py='3'>
                            {submissions?.data?.map((submission: any) => (
                              <Grid
                                templateColumns='repeat(5, 1fr)'
                                gap={8}
                                alignItems='center'
                              >
                                <GridItem colSpan={{ base: 2, md: 4 }}>
                                  <Stack spacing='2'>
                                    {size([]) < 6 && (
                                      <Tag
                                        color='yellow.500'
                                        bg='dark.800'
                                        alignSelf='self-start'
                                        size='sm'
                                        borderRadius='3xl'
                                      >
                                        <Text as='span' fontWeight='regular'>
                                          Pending
                                        </Text>
                                      </Tag>
                                    )}
                                    <HStack align='flex-start' spacing='4'>
                                      <Stack spacing='1' maxW='lg'>
                                        <Heading size='xs' fontWeight='black'>
                                          {truncateAddress(
                                            submission?.contract_address,
                                          )}
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
                                        extensionAddress:
                                          multisigExtension?.contract_address,
                                        proposalAddress:
                                          submission?.contract_address,
                                        onFinish(payload) {
                                          const { txId } = payload;
                                          createProposal.mutate({
                                            contract_address:
                                              submission?.contract_address,
                                            proposed_by: stxAddress as string,
                                            tx_id: txId,
                                          });
                                        },
                                      })
                                    }
                                  >
                                    Propose
                                  </Button>
                                </GridItem>
                              </Grid>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
          <GridItem colSpan={6}>
            <Card>
              <Stack spacing='5'>
                <Box px={{ base: '4', md: '6' }} pt='5'>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justify='space-between'
                    align='center'
                  >
                    <Text
                      color='light.900'
                      fontSize='lg'
                      fontWeight='regular'
                      letterSpacing='tight'
                    >
                      Activity
                    </Text>
                    <InputGroup maxW='xs'>
                      <Input placeholder='Search' />
                    </InputGroup>
                  </Stack>
                </Box>
                <Box overflowX='auto'>
                  <TransactionTable
                    transactions={transactions?.data}
                    bg='dark.900'
                    variant='simple'
                    size='sm'
                  />
                </Box>
              </Stack>
            </Card>
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
    <Flex justify='space-between' align='center' py='5' px='4'>
      <Heading size='md' fontWeight='black' letterSpacing='tight'>
        Dashboard
      </Heading>
      <CreateProposal
        title='Create proposal'
        variant='default'
        size='sm'
        isDisabled={!isActive}
        _hover={{ opacity: 0.9 }}
      />
    </Flex>
  );
};

Dashboard.getLayout = (page: any) => (
  <DashboardLayout header={<Header />}>{page}</DashboardLayout>
);
