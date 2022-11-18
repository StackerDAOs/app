import React from 'react';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Circle,
  Icon,
  Heading,
  HStack,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Spinner,
  Text,
} from 'ui';
import { map, size } from 'lodash';
import { Card } from 'ui/components/cards';
import { Wrapper } from '@components/containers';
import { AppLayout } from '@components/layout';
import { SetupHeader } from '@components/navigation';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useContract } from 'ui/hooks';
import {
  InitializeClubButton,
  DeployBootstrapButton,
  DeployVaultButton,
} from 'ui/components/buttons';
import { useDAO, useTransaction } from 'ui/hooks/teams';
import {
  getPercentage,
  findExtension,
  nameToSlug,
  getExplorerLink,
} from 'utils';
import { InfoIcon, LightningBolt } from 'ui/components/icons';
import { CustomAccordianItem } from '@components/disclosure';

const EXTENSION_SIZE = 6;

export default function Start() {
  const contract = useContract(
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stackerdao',
    'core',
  );
  console.log({ contract });
  const router = useRouter();
  const dao = useDAO();
  const { data: bootstrapTransaction } = useTransaction(
    dao?.data?.bootstrap_tx_id,
  );
  const { data: activationTransaction } = useTransaction(
    dao?.data?.activation_tx_id,
  );
  const isReady = dao?.data?.extensions?.length === EXTENSION_SIZE;

  const isActive =
    dao?.data?.active && activationTransaction?.tx_status === 'success';
  const onFinish = () => {
    console.log('onFinish');
  };
  const hasExtension = (extension: string) =>
    findExtension(dao?.data?.extensions, extension);

  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const teamExtension = findExtension(dao?.data?.extensions, 'Team');

  const progressForTeams = size(
    [vaultExtension, teamExtension].filter(
      (extension) => extension !== undefined,
    ),
  );

  const renderStatusComponent = (
    bootstrapStatus: string,
    activationStatus: string,
  ) => {
    if (
      bootstrapStatus === 'success' &&
      activationStatus === 'success' &&
      isActive
    ) {
      return (
        <>
          <GridItem colSpan={{ base: 2, md: 4 }}>
            <Stack spacing='1'>
              <HStack align='flex-start' spacing='4'>
                <Circle bg='dark.500' size='10'>
                  <Icon as={LightningBolt} boxSize='6' color='primary.900' />
                </Circle>
                <Stack spacing='1' maxW='lg'>
                  <Heading size='md' fontWeight='regular'>
                    Congratulations!
                  </Heading>
                  <Text fontSize='md' fontWeight='thin' color='text-muted'>
                    You are ready to start fundraising for your Club{' '}
                  </Text>
                </Stack>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Button
              variant='primary'
              onClick={() => router.push(`/${router.query?.dao}`)}
              isFullWidth
            >
              Go to dashboard
            </Button>
          </GridItem>
        </>
      );
    }
    if (bootstrapStatus === 'success' && activationStatus === 'pending') {
      return (
        <>
          <GridItem colSpan={{ base: 2, md: 4 }}>
            <Stack spacing='1'>
              <HStack align='flex-start' spacing='4'>
                <Circle bg='dark.500' size='10'>
                  <Icon as={LightningBolt} boxSize='6' color='primary.900' />
                </Circle>
                <Stack spacing='1' maxW='lg'>
                  <Heading size='md' fontWeight='regular'>
                    Launching club
                  </Heading>
                  <Text fontSize='md' fontWeight='thin' color='text-muted'>
                    Once your bootstrap contract is deployed, you can activate
                    your Club.{' '}
                    <Text
                      fontWeight='semibold'
                      color='light.900'
                      display='inline'
                    >
                      <a href={getExplorerLink(activationTransaction?.tx_id)}>
                        View transaction
                      </a>
                    </Text>
                    .
                  </Text>
                </Stack>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Button variant='primary' isFullWidth>
              <Spinner />
            </Button>
          </GridItem>
        </>
      );
    }
    if (bootstrapStatus === 'pending') {
      return (
        <>
          <GridItem colSpan={{ base: 2, md: 4 }}>
            <Stack spacing='1'>
              <HStack align='flex-start' spacing='4'>
                <Circle bg='dark.500' size='10'>
                  <Icon as={LightningBolt} boxSize='6' color='primary.900' />
                </Circle>
                <Stack spacing='1' maxW='lg'>
                  <Heading size='md' fontWeight='regular'>
                    Preparing your club for launch
                  </Heading>
                  <Text fontSize='md' fontWeight='thin' color='text-muted'>
                    Once your bootstrap contract is deployed, you can activate
                    your Club.{' '}
                    <Text
                      fontWeight='semibold'
                      color='light.900'
                      display='inline'
                    >
                      <a href={getExplorerLink(bootstrapTransaction?.tx_id)}>
                        View transaction
                      </a>
                    </Text>
                    .
                  </Text>
                </Stack>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Button variant='primary' isFullWidth>
              <Spinner />
            </Button>
          </GridItem>
        </>
      );
    }

    if (bootstrapStatus === 'success') {
      return (
        <>
          <GridItem colSpan={{ base: 2, md: 4 }}>
            <Stack spacing='1'>
              <HStack align='flex-start' spacing='4'>
                <Circle bg='dark.500' size='10'>
                  <Icon as={LightningBolt} boxSize='6' color='primary.900' />
                </Circle>
                <Stack spacing='1' maxW='lg'>
                  <Heading size='md' fontWeight='regular'>
                    You&apos;re all set!
                  </Heading>
                  <Text fontSize='md' fontWeight='thin' color='text-muted'>
                    Once you decide to activate your club, {dao?.data?.name}{' '}
                    will be open for deposits for ~{' '}
                    {dao?.data?.config?.durationInDays} days .
                  </Text>
                </Stack>
              </HStack>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <InitializeClubButton
              variant='primary'
              isFullWidth
              title='Start'
              contractPrincipal={dao?.data?.contract_address}
              bootstrapPrincipal={dao?.data?.bootstrap_address}
              onSubmit={() => console.log('init!')}
            />
          </GridItem>
        </>
      );
    }
    return (
      <>
        <GridItem colSpan={{ base: 2, md: 4 }}>
          <Stack spacing='1'>
            <HStack align='flex-start' spacing='4'>
              <Circle bg='dark.500' size='10'>
                <Icon as={LightningBolt} boxSize='6' color='primary.900' />
              </Circle>
              <Stack spacing='1' maxW='lg'>
                <Heading size='md' fontWeight='regular'>
                  Finalize Club Setup
                </Heading>
                <Text fontSize='md' fontWeight='thin' color='text-muted'>
                  The boostrap contract initializes your Club. Once deployed,
                  you&apos;ll have to make a contract call, and your Club will
                  be ready to raise funds!
                </Text>
              </Stack>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <DeployBootstrapButton
            variant='primary'
            coreDao={dao?.data?.contract_address}
            title='Deploy Bootstrap'
            slug={nameToSlug(dao?.data?.name)}
            extensions={map(dao?.data?.extensions)}
            isDisabled={!hasExtension('Voting')}
            memberAddresses={dao?.data?.config?.memberAddresses}
            onDeploy={() => console.log('init!')}
          />
        </GridItem>
      </>
    );
  };

  const renderStatusCard = (
    <Stack spacing='8' mt='6'>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.25, type: 'linear' }}
      >
        <Stack spacing='6'>
          <Card h='fit-content' bg='dark.700'>
            <Stack spacing='0'>
              <Grid
                templateColumns='repeat(5, 1fr)'
                gap={{ base: 0, md: 8 }}
                alignItems='center'
                justifyItems='space-between'
              >
                <GridItem colSpan={5}>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='2'
                  >
                    <Stack mt='2' spacing='3'>
                      <Stack spacing='0'>
                        <Grid
                          templateColumns='repeat(5, 1fr)'
                          gap={8}
                          alignItems='center'
                        >
                          {renderStatusComponent(
                            bootstrapTransaction?.tx_status,
                            activationTransaction?.tx_status,
                          )}
                        </Grid>
                      </Stack>
                    </Stack>
                  </Stack>
                </GridItem>
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </motion.div>
    </Stack>
  );

  if (dao?.isLoading && dao?.isFetching) {
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
        <Stack spacing='8' pb='16'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.25, type: 'linear' }}
          >
            <Stack spacing='3'>
              {isReady ? (
                renderStatusCard
              ) : (
                <Alert
                  bg='dark.700'
                  status='warning'
                  borderRadius='lg'
                  variant='left-accent'
                >
                  <Stack>
                    <HStack spacing='2'>
                      <AlertIcon m='0' />
                      <AlertTitle>Required Extensions</AlertTitle>
                    </HStack>
                    <AlertDescription>
                      You will deploy 6 contracts before you can go live with
                      your Club. You must deploy the following contracts in the
                      order below to complete the setup.
                    </AlertDescription>
                  </Stack>
                </Alert>
              )}
              <Stack spacing='0'>
                <Stack py={{ base: '6', md: '6' }} spacing='2'>
                  <Stack spacing='3'>
                    <Stack spacing='3'>
                      <Accordion defaultIndex={0}>
                        <Stack spacing='3'>
                          <CustomAccordianItem
                            title='Deploy Core DAO'
                            isPending={false}
                            hasCompleted
                          />

                          <CustomAccordianItem
                            title='Club and assets'
                            progressValue={getPercentage(2, progressForTeams)}
                            isPending={false}
                            hasCompleted={progressForTeams === 2}
                          >
                            <AccordionPanel pb={4}>
                              <Stack spacing='2'>
                                <Text
                                  textAlign='left'
                                  fontSize='lg'
                                  fontWeight='regular'
                                >
                                  Your vault will store your Club&apos;s assets,
                                  like fungible tokens and NFTs. The investment
                                  club extension helps to manage Club
                                  membership. After the initial fundraise, Club
                                  approved proposals can open a new fundraising
                                  window where the Club can issue more Club
                                  Passes to add members, accept new deposits,
                                  and issue depositors new governance tokens.
                                </Text>
                                <Stack py={{ base: '3', md: '3' }} spacing='2'>
                                  <SimpleGrid columns={2} spacing='4'>
                                    <Stack align='flex-start' spacing='0'>
                                      <HStack>
                                        <Text
                                          fontSize='md'
                                          fontWeight='light'
                                          color='gray'
                                        >
                                          Whitelisted assets
                                        </Text>
                                        <Icon as={InfoIcon} color='gray' />
                                      </HStack>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        NA
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack justify='space-between' direction='row'>
                                  <DeployVaultButton
                                    title='Deploy Vault'
                                    coreDao={dao?.data?.contract_address}
                                    name={`${dao?.data?.slug}-vault`}
                                    clubId={dao?.data?.id}
                                    hasExtension={hasExtension('Vault')}
                                    isDisabled={
                                      !hasExtension('Governance Token')
                                    }
                                    variant='primary'
                                    onDeploy={onFinish}
                                  />
                                </Stack>
                                <Stack py={{ base: '3', md: '3' }} spacing='2'>
                                  <SimpleGrid columns={2} spacing='4'>
                                    <Stack align='flex-start' spacing='0'>
                                      <Text
                                        fontSize='md'
                                        fontWeight='light'
                                        color='gray'
                                      >
                                        Minimum deposit
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        {dao?.data?.config?.minimumDeposit} STX
                                      </Text>
                                    </Stack>
                                    <Stack align='flex-start' spacing='0'>
                                      <Text
                                        fontSize='md'
                                        fontWeight='light'
                                        color='gray'
                                      >
                                        Fundraising duration
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        ~ {dao?.data?.config?.durationInDays}{' '}
                                        days
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack
                                  justify='space-between'
                                  direction='row'
                                ></Stack>
                              </Stack>
                            </AccordionPanel>
                          </CustomAccordianItem>
                        </Stack>
                      </Accordion>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </motion.div>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Start.getLayout = (page: any) => (
  <AppLayout header={<SetupHeader />}>{page}</AppLayout>
);
