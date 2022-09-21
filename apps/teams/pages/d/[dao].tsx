import React from 'react';
import {
  Button,
  Circle,
  FormControl,
  Icon,
  Image,
  Input,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Progress,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from 'ui';
import { map, size } from 'lodash';
import { Card } from 'ui/components/cards';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { DashboardHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import {
  DepositButton,
  DeployBootstrapButton,
  InitializeClubButton,
} from 'ui/components/buttons';
import { useAccountBalance, useDAO } from 'ui/hooks';
import { ustxToStx, getPercentage } from 'utils';
import { ClubsTable } from '@components/tables';
import { FinishSetupDrawer } from '@components/drawers';
import { LightningBolt, SwapArrows } from 'ui/components/icons';

const EXTENSION_SIZE = 6;

export default function Dashboard() {
  const dao = useDAO();
  const { data } = useAccountBalance();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositAmount, setDepositAmount] = React.useState('');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };

  const isInactive = !dao.data?.active;
  const isReadyToInitialize = dao.data?.extensions.length === EXTENSION_SIZE;

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
              <Card h='fit-content' bg='dark.700'>
                <Stack spacing='0'>
                  <Grid
                    templateColumns='repeat(5, 1fr)'
                    gap={{ base: 0, md: 8 }}
                    alignItems='center'
                    justifyItems='space-between'
                  >
                    <GridItem colSpan={4}>
                      {isReadyToInitialize ? (
                        <Stack
                          px={{ base: '6', md: '6' }}
                          py={{ base: '6', md: '6' }}
                          spacing='2'
                        >
                          <Stack mt='2' spacing='3'>
                            <Heading
                              mt='0 !important'
                              size='md'
                              fontWeight='medium'
                            >
                              You are ready to launch your Club!
                            </Heading>
                            <Progress
                              colorScheme='primary'
                              borderRadius='lg'
                              size='md'
                              value={getPercentage(
                                EXTENSION_SIZE,
                                size(dao.data?.extensions),
                              )}
                              bg='dark.500'
                            />
                            <Text
                              fontSize='md'
                              fontWeight='thin'
                              color='text-muted'
                            >
                              After you deploy your initial proposal you will be
                              able to start your Club.
                            </Text>
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack
                          px={{ base: '6', md: '6' }}
                          py={{ base: '6', md: '6' }}
                          spacing='2'
                        >
                          <Stack mt='2' spacing='3'>
                            <Heading
                              mt='0 !important'
                              size='md'
                              fontWeight='medium'
                            >
                              You still have a few more steps left
                            </Heading>
                            <Progress
                              colorScheme='primary'
                              borderRadius='lg'
                              size='md'
                              value={getPercentage(
                                EXTENSION_SIZE,
                                size(dao.data?.extensions),
                              )}
                              bg='dark.500'
                            />
                          </Stack>
                          <Text
                            fontSize='md'
                            fontWeight='thin'
                            color='text-muted'
                          >
                            {EXTENSION_SIZE - size(dao.data?.extensions)}{' '}
                            {size(dao.data?.extensions) !== 1
                              ? 'extension'
                              : 'extensions'}{' '}
                            left to deploy before you can initialize your club.
                          </Text>
                        </Stack>
                      )}
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                      <Stack
                        px={{ base: '6', md: '6' }}
                        py={{ base: '6', md: '6' }}
                        pt={{ base: '0', md: '6' }}
                        spacing='2'
                      >
                        {isReadyToInitialize ? (
                          <>
                            <Button variant='primary' onClick={onOpen}>
                              Launch your club
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                              <ModalOverlay />
                              <ModalContent
                                bg='dark.800'
                                borderColor='dark.500'
                                borderWidth='1px'
                              >
                                <ModalHeader bg='primary.900' borderRadius='md'>
                                  <Stack spacing='3'>
                                    <Heading
                                      mt='0 !important'
                                      size='md'
                                      fontWeight='medium'
                                    >
                                      Final steps
                                    </Heading>
                                  </Stack>
                                </ModalHeader>
                                <ModalBody>
                                  <Stack spacing='0'>
                                    <Stack
                                      px={{ base: '0', md: '0' }}
                                      py={{ base: '3', md: '3' }}
                                      spacing='6'
                                    >
                                      <Grid
                                        templateColumns='repeat(5, 1fr)'
                                        gap={8}
                                      >
                                        <GridItem colSpan={{ base: 2, md: 4 }}>
                                          <Stack spacing='1'>
                                            <Heading
                                              size='sm'
                                              fontWeight='medium'
                                            >
                                              Deploy your club proposal
                                            </Heading>
                                            <Text
                                              fontSize='sm'
                                              fontWeight='thin'
                                              color='text-muted'
                                            >
                                              This will finalize the setup of
                                              your club.
                                            </Text>
                                          </Stack>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                          <DeployBootstrapButton
                                            variant='primary'
                                            isFullWidth
                                            name='StackerDAO'
                                            slug='stackerdao'
                                            extensions={map(
                                              dao.data?.extensions,
                                            )}
                                            onFinish={() =>
                                              console.log('init!')
                                            }
                                          />
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 4 }}>
                                          <Stack spacing='1'>
                                            <Heading
                                              size='sm'
                                              fontWeight='medium'
                                            >
                                              Initialize club
                                            </Heading>
                                            <Text
                                              fontSize='sm'
                                              fontWeight='thin'
                                              color='text-muted'
                                            >
                                              This will activate your club based
                                              on the proposal you just deployed.
                                            </Text>
                                          </Stack>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                          <InitializeClubButton
                                            variant='primary'
                                            isFullWidth
                                            title='Start'
                                            address='123'
                                          />
                                        </GridItem>
                                      </Grid>
                                    </Stack>
                                  </Stack>
                                </ModalBody>
                              </ModalContent>
                            </Modal>
                          </>
                        ) : (
                          <FinishSetupDrawer
                            variant='default'
                            clubId={dao.data?.id}
                            defaultStartingValue={size(dao.data?.extensions)}
                          />
                        )}
                      </Stack>
                    </GridItem>
                  </Grid>
                </Stack>
              </Card>
            </motion.div>
          </Stack>
          <Stack spacing='8' pb='16' mt='6'>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.25, type: 'linear' }}
            >
              <Stack spacing='6'>
                <SectionHeader
                  justify={{ base: 'flex-start', md: 'space-between' }}
                  align={{ base: 'flex-start', md: 'space-between' }}
                  color='light.900'
                >
                  <Stack spacing='3'>
                    <Text fontSize='md' fontWeight='light' color='text-muted'>
                      Explore Contracts
                    </Text>
                    <Heading mt='0 !important' size='lg' fontWeight='medium'>
                      Browse Extensions
                    </Heading>
                  </Stack>
                </SectionHeader>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing='6'>
                  <Card h='fit-content' bg='dark.900'>
                    <Stack spacing='0'>
                      <Stack
                        px={{ base: '6', md: '6' }}
                        py={{ base: '6', md: '6' }}
                        spacing='2'
                      >
                        <Stack spacing='1'>
                          <HStack align='baseline'>
                            <Circle bg='dark.500' size='7' mb='3'>
                              <Icon
                                as={LightningBolt}
                                boxSize='4'
                                color='primary.900'
                              />
                            </Circle>
                            <Heading
                              mt='0 !important'
                              size='sm'
                              fontWeight='semibold'
                            >
                              Buy &amp; Sell NFTs
                            </Heading>
                          </HStack>

                          <Text
                            fontSize='md'
                            fontWeight='thin'
                            color='text-default'
                          >
                            Add the ability for your club to buy and sell NFTs
                            via proposal submissions.
                          </Text>
                        </Stack>
                        <Button variant='default' isDisabled>
                          Add
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                  <Card h='fit-content' bg='dark.900'>
                    <Stack spacing='0'>
                      <Stack
                        px={{ base: '6', md: '6' }}
                        py={{ base: '6', md: '6' }}
                        spacing='2'
                      >
                        <Stack spacing='1'>
                          <HStack align='baseline'>
                            <Circle bg='dark.500' size='7' mb='3'>
                              <Icon
                                as={SwapArrows}
                                boxSize='4'
                                color='primary.900'
                              />
                            </Circle>
                            <Heading
                              mt='0 !important'
                              size='sm'
                              fontWeight='semibold'
                            >
                              Swap Tokens
                            </Heading>
                          </HStack>

                          <Text
                            fontSize='md'
                            fontWeight='thin'
                            color='text-default'
                          >
                            Bring DeFi to your Club by adding token swap
                            integration straight from your vault.
                          </Text>
                        </Stack>
                        <Button variant='default' isDisabled>
                          Add
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                </SimpleGrid>
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
                            setDepositAmount(ustxToStx(data?.account?.balance))
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
