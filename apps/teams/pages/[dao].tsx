import React from 'react';
import Link from 'next/link';
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
  Text,
} from 'ui';
import { useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { ConnectButton } from 'ui/components/buttons';
import { useTeam, useTeamTransactions, useTeamProposals } from 'ui/hooks';
import { findExtension } from 'utils';
import { TransactionTable } from '@components/tables';
import { useActivateTeam } from 'api/teams/mutations';

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const dao = useTeam();
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const transactions = useTeamTransactions(
    vaultExtension?.contract_address,
    'vault',
  );
  const isActive = dao?.data?.active;
  const activate = useActivateTeam();

  const proposals = useTeamProposals();

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
                <Card bg='dark.800' h='192px'>
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
                      Treasury
                    </Heading>
                    <Stack spacing='3' justify='center' h='full'>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Balance
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          1,242{' '}
                          <Text as='span' fontSize='sm' fontWeight='thin'>
                            STX
                          </Text>
                        </Text>
                      </HStack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Tokens
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          7
                        </Text>
                      </HStack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Collectibles
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          2
                        </Text>
                      </HStack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
              <GridItem colSpan={5}>
                <Stack spacing='3'>
                  <Card bg='dark.900' h='192px'>
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
                        <Button variant='link' size='sm' color='gray'>
                          View All
                        </Button>
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
                          <Stack spacing='6'>
                            {proposals?.data?.map(({ submission }: any) => (
                              <Stack spacing='3'>
                                <Box>
                                  <Stack spacing='2'>
                                    <Stack spacing='0'>
                                      <Text fontSize='sm' color='light.500'>
                                        {submission.title}
                                      </Text>
                                      <Text fontSize='sm' color='gray'>
                                        {submission.description}
                                      </Text>
                                    </Stack>
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

const Header = () => (
  <Flex justify='space-between' align='center' py='6' px='4'>
    <Heading size='md' fontWeight='black' letterSpacing='tight'>
      Dashboard
    </Heading>
  </Flex>
);

Dashboard.getLayout = (page: any) => (
  <DashboardLayout header={<Header />}>{page}</DashboardLayout>
);
