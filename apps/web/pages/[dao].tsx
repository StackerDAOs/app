import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  Image,
  Input,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from 'ui';
import { useAuth } from 'ui/components';
import { defaultTo, round } from 'lodash';
import { Card } from 'ui/components/cards';
import { SectionHeader } from 'ui/components/layout';
import { Wrapper } from '@components/containers';
import { AppLayout } from '@components/layout';
import { DashboardHeader } from '@components/navigation';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { ConnectButton, DepositButton } from 'ui/components/buttons';
import { useInvestmentClub, useGovernanceToken, useDAO } from 'ui/hooks';
import { ustxToStx, getPercentage, findExtension, convertToken } from 'utils';

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const dao = useDAO();
  const governanceToken = useGovernanceToken();
  const investmentClub = useInvestmentClub();

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

  if (!isSignedIn) {
    return (
      <Wrapper m='0 auto' align='center'>
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
      </Wrapper>
    );
  }

  if (!dao?.data) {
    return (
      <Wrapper m='0 auto' align='center'>
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
      </Wrapper>
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
      <Wrapper m='0 auto' align='center'>
        <Stack spacing='6'>
          <Stack
            spacing='8'
            pb='16'
            mt='6'
            filter={dao?.data?.active ? 'none' : 'blur(3px)'}
            pointerEvents={dao?.data?.active ? 'auto' : 'none'}
          >
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.25, type: 'linear' }}
            >
              <Stack mt='2' spacing='3'>
                <Progress
                  colorScheme='primary'
                  borderRadius='lg'
                  size='md'
                  value={getPercentage(
                    10000,
                    Number(
                      ustxToStx(
                        String(
                          investmentClub?.data?.currentRound?.raisedAmount,
                        ),
                        false,
                      ),
                    ),
                  )}
                  bg='dark.500'
                />
                <HStack justify='space-between'>
                  <Stack spacing='3'>
                    <Text fontSize='md' fontWeight='thin' color='text-muted'>
                      Amount raised
                    </Text>
                    <Heading mt='0 !important' size='sm' fontWeight='regular'>
                      {defaultTo(
                        ustxToStx(
                          String(
                            investmentClub?.data?.currentRound?.raisedAmount,
                          ),
                        ),
                        '0',
                      )}{' '}
                      STX
                    </Heading>
                  </Stack>
                  <Stack spacing='3'>
                    <Text fontSize='md' fontWeight='thin' color='text-muted'>
                      Funding goal
                    </Text>
                    <Heading mt='0 !important' size='sm' fontWeight='regular'>
                      {defaultTo(
                        ustxToStx(
                          String(
                            investmentClub?.data?.currentRound?.fundingGoal,
                          ),
                        ),
                        '0',
                      )}{' '}
                      STX
                    </Heading>
                  </Stack>
                </HStack>
              </Stack>
            </motion.div>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing='8'>
              <Card h='fit-content' bg='dark.700'>
                <Stack spacing='0'>
                  <HStack
                    justify='space-between'
                    bg='dark.500'
                    borderRadius='lg'
                    px={{ base: '6', md: '6' }}
                    py={{ base: '3', md: '3' }}
                  >
                    <Text color='light.900' fontSize='lg' fontWeight='regular'>
                      Open to deposits
                    </Text>
                    <Text color='gray' fontSize='md' fontWeight='light'>
                      Closes in ~ {dao?.data?.config?.durationInDays} days{' '}
                      {/* TODO: fetch block height and do estimate */}
                    </Text>
                  </HStack>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='6'
                  >
                    <HStack justify='space-between' align='center' spacing='2'>
                      <VStack align='flex-start' spacing='2'>
                        <FormControl>
                          <Input
                            py='1'
                            px='2'
                            bg='dark.700'
                            type='tel'
                            border='none'
                            fontSize='2xl'
                            fontWeight='light'
                            autoComplete='off'
                            placeholder='0'
                            value={depositAmount}
                            onInput={handleInputDeposit}
                            _focus={{
                              border: 'none',
                            }}
                          />
                        </FormControl>
                      </VStack>
                      <HStack
                        bg='dark.600'
                        borderRadius='lg'
                        borderColor='dark.500'
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
                    <Stack w='100%'>
                      <DepositButton
                        title='Deposit'
                        variant='primary'
                        investmentClubAddress={
                          investmentClubExtension?.contract_address
                        }
                        amount={depositAmount}
                      />
                      <Text
                        color='gray'
                        textAlign='center'
                        fontSize='md'
                        fontWeight='light'
                      >
                        Minimum deposit amount is{' '}
                        {dao?.data?.config?.minimumDeposit} STX
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
              <Card h='fit-content' bg='dark.700'>
                <Stack spacing='0'>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='6'
                  >
                    <Text color='light.900' fontSize='lg' fontWeight='regular'>
                      Your holdings
                    </Text>
                    <HStack justify='space-between' spacing='8'>
                      <Stack spacing='3' w='50%'>
                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-muted'
                        >
                          Club tokens minted
                        </Text>
                        <Heading
                          mt='0 !important'
                          size='sm'
                          fontWeight='regular'
                        >
                          {defaultTo(
                            convertToken(
                              String(governanceToken?.data?.totalSupply),
                              6,
                            ),
                            '0',
                          )}{' '}
                          {governanceToken?.data?.symbol}
                        </Heading>
                      </Stack>
                      <Stack spacing='3' w='50%'>
                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-muted'
                        >
                          Your tokens
                        </Text>
                        <Heading
                          mt='0 !important'
                          size='sm'
                          fontWeight='regular'
                        >
                          {defaultTo(
                            convertToken(
                              String(governanceToken?.data?.balance),
                              6,
                            ),
                            '0',
                          )}{' '}
                          {governanceToken?.data?.symbol}
                        </Heading>
                      </Stack>
                    </HStack>
                    <HStack justify='space-between' spacing='8'>
                      <Stack spacing='3' w='50%'>
                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-muted'
                        >
                          Amount deposited
                        </Text>
                        <Heading
                          mt='0 !important'
                          size='sm'
                          fontWeight='regular'
                        >
                          {defaultTo(
                            ustxToStx(
                              String(
                                investmentClub?.data?.currentRound
                                  ?.raisedAmount,
                              ),
                            ),
                            '0',
                          )}{' '}
                          STX
                        </Heading>
                      </Stack>
                      <Stack spacing='3' w='50%'>
                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-muted'
                        >
                          Ownership %
                        </Text>
                        <Heading
                          mt='0 !important'
                          size='sm'
                          fontWeight='regular'
                        >
                          {defaultTo(
                            round(
                              getPercentage(
                                Number(governanceToken?.data?.totalSupply),
                                Number(governanceToken?.data?.balance),
                              ),
                              2,
                            ),
                            '0',
                          )}
                          %
                        </Heading>
                      </Stack>
                    </HStack>
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
        </Stack>
        <Stack spacing='6'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Text fontSize='md' fontWeight='light' color='text-muted'>
                Investors
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Club Members
              </Heading>
            </Stack>
          </SectionHeader>
        </Stack>
        <Stack spacing='8' pb='16'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.25, type: 'linear' }}
          >
            <Stack spacing='3'>
              {/* <ClubsTable color='light.900' size='md' clubs={[]} /> */}
            </Stack>
          </motion.div>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Dashboard.getLayout = (page: any) => (
  <AppLayout header={<DashboardHeader />}>{page}</AppLayout>
);
