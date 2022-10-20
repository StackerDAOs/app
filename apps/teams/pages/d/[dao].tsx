import React from 'react';
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
import { Card } from 'ui/components/cards';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { DashboardHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { DepositButton } from 'ui/components/buttons';
import { useAccountBalance, useDAO } from 'ui/hooks';
import { ustxToStx } from 'utils';
import { ClubsTable } from '@components/tables';
import { EmptyState } from '@components/misc';

export default function Dashboard() {
  const dao = useDAO();
  const { data } = useAccountBalance();
  const [depositAmount, setDepositAmount] = React.useState('');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };

  const isInactive = !dao.data?.active;

  if (dao.isLoading || dao.isFetching) {
    return null;
  }

  if (isInactive) {
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
              <Stack spacing='0'>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                >
                  <EmptyState align='center' textAlign='center' spacing='3'>
                    <Stack spacing='1'>
                      <Heading size='md' fontWeight='light'>
                        Your team is still inactive
                      </Heading>
                      <Text color='gray' maxW='md'>
                        You are ready to initialize your team. Once you do, you
                        will be able to submit and vote on proposals.
                      </Text>
                    </Stack>
                    <Button variant='primary' isDisabled>
                      Initialize your team
                    </Button>
                  </EmptyState>
                </Stack>
              </Stack>
            </motion.div>
          </Stack>
        </Wrapper>
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
      <Wrapper>
        <Stack spacing='6'>
          <Stack spacing='8' pb='16' mt='6'>
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
                  value={12}
                  bg='dark.500'
                />
                <HStack justify='space-between'>
                  <Stack spacing='3'>
                    <Text fontSize='md' fontWeight='thin' color='text-muted'>
                      Amount raised
                    </Text>
                    <Heading mt='0 !important' size='sm' fontWeight='regular'>
                      12,044 STX
                    </Heading>
                  </Stack>
                  <Stack spacing='3'>
                    <Text fontSize='md' fontWeight='thin' color='text-muted'>
                      Funding goal
                    </Text>
                    <Heading mt='0 !important' size='sm' fontWeight='regular'>
                      100,000 STX
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
                      Closes in ~ 2 weeks
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
                            maxW='8em'
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
                        <HStack px='2'>
                          <Image
                            cursor='pointer'
                            height='18px'
                            src='https://cryptologos.cc/logos/stacks-stx-logo.png?v=022'
                            alt='logo'
                          />

                          <Text fontSize='md' fontWeight='regular' color='gray'>
                            STX
                          </Text>
                        </HStack>
                      </VStack>
                      <HStack>
                        <Button
                          color='light.900'
                          bg='dark.500'
                          onClick={() =>
                            setDepositAmount(
                              String(ustxToStx(data?.account?.balance)),
                            )
                          }
                          _hover={{ opacity: 0.9 }}
                          _active={{ opacity: 1 }}
                        >
                          Max
                        </Button>
                      </HStack>
                    </HStack>
                    <Stack w='100%'>
                      <DepositButton
                        title='Deposit'
                        variant='primary'
                        investmentClubAddress=''
                        amount={depositAmount}
                      />
                      <Text
                        color='gray'
                        textAlign='center'
                        fontSize='md'
                        fontWeight='regular'
                      >
                        Your wallet balance: {ustxToStx(data?.account?.balance)}{' '}
                        STX
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
                          12,044 STACK
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
                          12,044 STACK
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
                          12,044 STX
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
                          100%
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
            <Stack mt='2' spacing='3'>
              <ClubsTable color='light.900' size='md' clubs={[]} />
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
