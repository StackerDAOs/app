import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from 'ui';
import { useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { ConnectButton } from 'ui/components/buttons';
import { CreateProposal } from '@components/drawers';
import { DepositButton } from '@components/buttons';
import { useTeam, useTeamTransactions } from 'ui/hooks';
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
  const [depositAmount, setDepositAmount] = React.useState('');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };

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
                <Card h='fit-content' bg='dark.900'>
                  <Stack spacing='0'>
                    <Stack
                      spacing='6'
                      justify='space-between'
                      direction='row'
                      px={{ base: '6', md: '6' }}
                      py={{ base: '3', md: '3' }}
                      bg='dark.700'
                      borderTopLeftRadius='md'
                      borderTopRightRadius='md'
                      align='center'
                    >
                      <Heading
                        color='light.900'
                        fontSize='md'
                        fontWeight='regular'
                        letterSpacing='tight'
                      >
                        Vault
                      </Heading>
                    </Stack>
                    <Stack
                      px={{ base: '6', md: '6' }}
                      py={{ base: '6', md: '6' }}
                      spacing='6'
                    >
                      <HStack
                        justify='space-between'
                        align='center'
                        spacing='2'
                      >
                        <VStack align='flex-start' spacing='2'>
                          <FormControl>
                            <Input
                              py='1'
                              px='2'
                              bg='dark.900'
                              type='tel'
                              border='none'
                              fontSize='2xl'
                              fontWeight='regular'
                              autoComplete='off'
                              placeholder='0.0'
                              onChange={handleInputDeposit}
                            />
                          </FormControl>
                        </VStack>
                        <HStack
                          bg='dark.900'
                          borderRadius='lg'
                          borderColor='dark.500'
                          borderWidth='1px'
                          py='1'
                          px='3'
                        >
                          <Image
                            cursor='pointer'
                            height='16px'
                            src='https://cryptologos.cc/logos/stacks-stx-logo.png?v=022'
                            alt='logo'
                          />

                          <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            color='light.500'
                          >
                            STX
                          </Text>
                        </HStack>
                      </HStack>
                      <Stack spacing='3'>
                        <DepositButton
                          title='Deposit'
                          variant='primary'
                          size='sm'
                          vaultAddress={vaultExtension?.contract_address}
                          amount={depositAmount}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
              <GridItem colSpan={5}>
                <Card bg='dark.800'>
                  <Stack spacing='0'>
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
                        Fundraise Progress
                      </Heading>
                      <Stack spacing='6'>
                        <Stack spacing='6'>
                          <Stack spacing='3'>
                            <HStack justify='space-between'>
                              <Text
                                fontSize='md'
                                fontWeight='regular'
                                color='gray'
                              >
                                Amount Raised
                              </Text>
                              <Text
                                fontSize='md'
                                fontWeight='regular'
                                color='light.900'
                              >
                                1,242 STX
                              </Text>
                            </HStack>
                            <HStack justify='space-between'>
                              <Text
                                fontSize='md'
                                fontWeight='regular'
                                color='gray'
                              >
                                Funding Goal
                              </Text>
                              <Text
                                fontSize='md'
                                fontWeight='regular'
                                color='light.900'
                              >
                                10,000 STX
                              </Text>
                            </HStack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
          <GridItem colSpan={6}>
            <Card bg='dark.900'>
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
