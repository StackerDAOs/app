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
  Icon,
  Image,
  Input,
  InputGroup,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from 'ui';
import { useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { ConnectButton, DepositButton } from 'ui/components/buttons';
import { ProposalDrawer } from '@components/drawers';
import { useDAO } from 'ui/hooks';
import { getPercentage, findExtension } from 'utils';
import { ArrowRight } from 'ui/components/icons';
import { TransactionTable } from '@components/tables';
import { useActivateClub } from 'api/clubs/mutations';

export default function Dashboard() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const dao = useDAO();
  const isActive = dao?.data?.active;
  const activate = useActivateClub();
  const [depositAmount, setDepositAmount] = React.useState('');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };
  const investmentClubExtension = findExtension(
    dao?.data?.extensions,
    'Investment Club',
  );

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
                <Card bg='dark.800' h='225px'>
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
                          <Stack spacing='1'>
                            <Progress
                              colorScheme='primary'
                              borderRadius='lg'
                              size='md'
                              value={getPercentage(10000, 5000)}
                              bg='dark.500'
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
              <GridItem colSpan={4}>
                <Card h='225px' bg='dark.900'>
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
                        Open to deposits
                      </Heading>
                      <Text
                        color='light.500'
                        fontSize='sm'
                        fontWeight='regular'
                      >
                        Closes in ~ {dao?.data?.config?.durationInDays} days{' '}
                        {/* TODO: fetch block height and do estimate */}
                      </Text>
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
                          investmentClubAddress={
                            investmentClubExtension?.contract_address
                          }
                          amount={depositAmount}
                        />
                        <Text
                          color='gray'
                          textAlign='center'
                          fontSize='sm'
                          fontWeight='light'
                        >
                          Minimum deposit amount is{' '}
                          {dao?.data?.config?.minimumDeposit} STX
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
          <GridItem colSpan={2}>
            <Card bg='dark.800' h='200px'>
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
                    All-time Stats
                  </Heading>
                  <Stack spacing='6'>
                    <Stack spacing='3'>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Tokens Minted
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='regular'
                          color='light.900'
                        >
                          1,242 STACK
                        </Text>
                      </HStack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Total Raised
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='regular'
                          color='light.900'
                        >
                          12,242 STX
                        </Text>
                      </HStack>
                    </Stack>
                    <HStack justify='space-between'>
                      <Text fontSize='md' fontWeight='regular' color='gray'>
                        Avg Deposit
                      </Text>
                      <Text
                        fontSize='md'
                        fontWeight='regular'
                        color='light.900'
                      >
                        75 STX
                      </Text>
                    </HStack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card bg='dark.800' h='200px'>
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
                    Current Round
                  </Heading>
                  <Stack spacing='6'>
                    <Stack spacing='3'>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Total Depositors
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='regular'
                          color='light.900'
                        >
                          3
                        </Text>
                      </HStack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Total Amount
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='regular'
                          color='light.900'
                        >
                          1,242 STX
                        </Text>
                      </HStack>
                    </Stack>
                    <Stack spacing='1'>
                      <Progress
                        colorScheme='whiteAlpha'
                        borderRadius='lg'
                        size='md'
                        value={getPercentage(10000, 5000)}
                        bg='dark.500'
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card bg='dark.800' h='200px'>
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
                    My Holdings
                  </Heading>
                  <Stack spacing='6'>
                    <Stack spacing='6'>
                      <Stack spacing='3'>
                        <HStack justify='space-between'>
                          <Text fontSize='md' fontWeight='regular' color='gray'>
                            My Tokens
                          </Text>
                          <Text
                            fontSize='md'
                            fontWeight='regular'
                            color='light.900'
                          >
                            150 STACK
                          </Text>
                        </HStack>
                        <HStack justify='space-between'>
                          <Text fontSize='md' fontWeight='regular' color='gray'>
                            Amount Deposited
                          </Text>
                          <Text
                            fontSize='md'
                            fontWeight='regular'
                            color='light.900'
                          >
                            150 STX
                          </Text>
                        </HStack>
                      </Stack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Ownership %
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='regular'
                          color='light.900'
                        >
                          5%
                        </Text>
                      </HStack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
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
              <TransactionTable bg='dark.900' variant='simple' size='sm' />
            </Box>
            <Stack px={{ base: '4', md: '6' }} pb='5' align='flex-end'>
              {!isMobile && (
                <HStack>
                  <Text color='light.900' fontWeight='light' fontSize='sm'>
                    All transactions
                  </Text>
                  <Icon as={ArrowRight} />
                </HStack>
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </motion.div>
  );
}

const Header = () => {
  const dao = useDAO();
  const isActive = dao?.data?.active;

  return (
    <Flex justify='space-between' align='center' py='5' px='4'>
      <Heading size='md' fontWeight='black' letterSpacing='tight'>
        Dashboard
      </Heading>
      <ProposalDrawer
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
