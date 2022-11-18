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
import { useAccount } from 'ui/components';
import { Card } from 'ui/components/cards';
import { Wrapper } from '@components/containers';
import { AppLayout } from '@components/layout';
import { SetupHeader } from '@components/navigation';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import {
  governanceToken,
  investmentClub,
  nftMembership,
  vault,
  votingExtension as votingTemplate,
  submissionExtension as submissionTemplate,
  bootstrapProposal,
} from 'utils/contracts';
import {
  InitializeClubButton,
  DeployBootstrapButton,
  StacksDeploy,
} from 'ui/components/buttons';
import { useDAO, useTransaction, useContract } from 'ui/hooks';
import { useCreateExtension } from 'api/clubs/mutations/extensions';
import { useUpdateBootstrap } from 'api/clubs/mutations';
import { CLUB_EXTENSION_TYPES } from 'api/constants';
import {
  getPercentage,
  findExtension,
  nameToSlug,
  getExplorerLink,
  stxToUstx,
} from 'utils';
import { InfoIcon, LightningBolt } from 'ui/components/icons';
import { CustomAccordianItem } from '@components/disclosure';

const EXTENSION_SIZE = 6;

export default function Start() {
  const contract = useContract(
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stackerdao-club-submission',
    'submission',
  );
  console.log({ contract });
  const router = useRouter();
  const dao = useDAO();
  const { stxAddress } = useAccount();
  const createExtension = useCreateExtension();
  const updateBootstrap = useUpdateBootstrap();
  const contractExtensionDetails = {
    clubPass: {
      name: 'NFT Membership',
      description: 'A non-fungible token that represents membership.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-pass`,
      contractName: `${dao?.data?.slug}-club-pass`,
    },
    clubToken: {
      name: 'Governance Token',
      description: 'A fungible token that represents governance.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-token`,
      contractName: `${dao?.data?.slug}-club-token`,
    },
    clubVault: {
      name: 'Vault',
      description: 'A contract that holds funds.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-vault`,
      contractName: `${dao?.data?.slug}-club-vault`,
    },
    clubIC: {
      name: 'IC',
      description: 'A contract that holds funds.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-ic`,
      contractName: `${dao?.data?.slug}-club-ic`,
    },
    clubVoting: {
      name: 'Voting',
      description: 'A contract that holds funds.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-voting`,
      contractName: `${dao?.data?.slug}-club-voting`,
    },
    clubSubmission: {
      name: 'Submission',
      description: 'A contract that holds funds.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-submission`,
      contractName: `${dao?.data?.slug}-club-submission`,
    },
    clubBootstrap: {
      name: 'Bootstrap',
      description: 'A contract that holds funds.',
      contractAddress: `${stxAddress}.${dao?.data?.slug}-club-bootstrap`,
      contractName: `${dao?.data?.slug}-club-bootstrap`,
    },
  };
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
  const nftExtension = findExtension(dao?.data?.extensions, 'NFT Membership');
  const governanceExtension = findExtension(
    dao?.data?.extensions,
    'Governance Token',
  );
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const investmentClubExtension = findExtension(
    dao?.data?.extensions,
    'Investment Club',
  );
  const votingExtension = findExtension(dao?.data?.extensions, 'Voting');
  const submissionExtension = findExtension(
    dao?.data?.extensions,
    'Submission',
  );
  const progressForMembership = size(
    [nftExtension, governanceExtension].filter(
      (extension) => extension !== undefined,
    ),
  );
  const progressForClubs = size(
    [vaultExtension, investmentClubExtension].filter(
      (extension) => extension !== undefined,
    ),
  );
  const progressForGovernance = size(
    [votingExtension, submissionExtension].filter(
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
          <StacksDeploy
            variant='primary'
            buttonName='Deploy Setup'
            contractName={contractExtensionDetails?.clubBootstrap.contractName}
            template={bootstrapProposal(
              dao?.data?.contract_address,
              {
                vaultContract: vaultExtension?.contract_address,
                governanceTokenContract: governanceExtension?.contract_address,
                nftMembershipContract: nftExtension?.contract_address,
                investmentClubContract:
                  investmentClubExtension?.contract_address,
                submissionContract: submissionExtension?.contract_address,
                votingContract: votingExtension?.contract_address,
              },
              dao?.data?.config?.memberAddresses?.length > 0
                ? dao?.data?.config?.memberAddresses
                : [],
            )}
            onSuccess={(data: any) => {
              updateBootstrap.mutate({
                contract_address: `${stxAddress}.${dao?.data?.slug}`,
                bootstrap_address:
                  contractExtensionDetails?.clubBootstrap.contractAddress,
                bootstrap_tx_id: data.txId,
              });
            }}
            isDisabled={!hasExtension('Submission')}
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
                            title='Manage Membership'
                            progressValue={getPercentage(
                              2,
                              progressForMembership,
                            )}
                            isPending={false}
                            hasCompleted={progressForMembership === 2}
                          >
                            <AccordionPanel pb={4}>
                              <Stack spacing='2'>
                                <Text
                                  textAlign='left'
                                  fontSize='lg'
                                  fontWeight='regular'
                                >
                                  Club Passes are non-transferable NFTs and
                                  define your Club&apos;s membership. Governance
                                  tokens are also non-transferable, issued to
                                  Club Pass holders who deposit funds at an
                                  amount representing the deposit&apos;s pro
                                  rata share of the Club&apos;s treasury, and
                                  define a member&apos;s voting power.
                                </Text>
                                <Stack py={{ base: '3', md: '3' }} spacing='2'>
                                  <SimpleGrid columns={2} spacing='4'>
                                    <Stack align='flex-start' spacing='0'>
                                      <Text
                                        fontSize='md'
                                        fontWeight='light'
                                        color='gray'
                                      >
                                        Club pass
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        {dao?.data?.name} Club Pass
                                      </Text>
                                    </Stack>
                                    <Stack align='flex-start' spacing='0'>
                                      <HStack>
                                        <Text
                                          fontSize='md'
                                          fontWeight='light'
                                          color='gray'
                                        >
                                          Members
                                        </Text>
                                        <Icon as={InfoIcon} color='gray' />
                                      </HStack>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        {
                                          dao?.data?.config?.memberAddresses
                                            ?.length
                                        }
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack justify='space-between' direction='row'>
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Club Pass'
                                    contractName={
                                      contractExtensionDetails?.clubPass
                                        .contractName
                                    }
                                    template={nftMembership(
                                      contractExtensionDetails?.clubPass
                                        .contractName,
                                      dao?.data?.contract_address,
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails?.clubPass
                                            .contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.NFT_MEMBERSHIP,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={hasExtension('NFT Membership')}
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
                                        Token name
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        {dao?.data?.name}
                                      </Text>
                                    </Stack>
                                    <Stack align='flex-start' spacing='0'>
                                      <Text
                                        fontSize='md'
                                        fontWeight='light'
                                        color='gray'
                                      >
                                        Token symbol
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        {dao?.data?.config?.tokenSymbol}
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack justify='space-between' direction='row'>
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Token'
                                    contractName={
                                      contractExtensionDetails?.clubToken
                                        .contractName
                                    }
                                    template={governanceToken(
                                      contractExtensionDetails?.clubToken
                                        .contractName,
                                      dao?.data?.config?.tokenSymbol,
                                      dao?.data?.contract_address,
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails?.clubToken
                                            .contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.GOVERNANCE_TOKEN,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={
                                      hasExtension('Governance Token') ||
                                      !hasExtension('NFT Membership')
                                    }
                                  />
                                </Stack>
                              </Stack>
                            </AccordionPanel>
                          </CustomAccordianItem>
                          <CustomAccordianItem
                            title='Club and assets'
                            progressValue={getPercentage(2, progressForClubs)}
                            isPending={false}
                            hasCompleted={progressForClubs === 2}
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
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Vault'
                                    contractName={
                                      contractExtensionDetails?.clubVault
                                        .contractName
                                    }
                                    template={vault(
                                      dao?.data?.contract_address,
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails?.clubVault
                                            .contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.VAULT,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={
                                      hasExtension('Vault') ||
                                      !hasExtension('Governance Token')
                                    }
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
                                <Stack justify='space-between' direction='row'>
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Investment Club'
                                    contractName={
                                      contractExtensionDetails?.clubIC
                                        .contractName
                                    }
                                    template={investmentClub(
                                      dao?.data?.contract_address,
                                      contractExtensionDetails?.clubPass
                                        .contractAddress,
                                      contractExtensionDetails?.clubToken
                                        .contractAddress,
                                      contractExtensionDetails?.clubVault
                                        .contractAddress,
                                      String(
                                        Number(
                                          dao?.data?.config?.durationInDays,
                                        ) * 144,
                                      ),
                                      String(
                                        stxToUstx(
                                          dao?.data?.config?.minimumDeposit,
                                        ),
                                      ),
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails?.clubIC
                                            .contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.INVESTMENT_CLUB,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={
                                      hasExtension('Investment Club') ||
                                      !hasExtension('Vault')
                                    }
                                  />
                                </Stack>
                              </Stack>
                            </AccordionPanel>
                          </CustomAccordianItem>
                          <CustomAccordianItem
                            title='Proposal submissions &amp; voting'
                            progressValue={getPercentage(
                              2,
                              progressForGovernance,
                            )}
                            isPending={false}
                            hasCompleted={progressForGovernance === 2}
                          >
                            <AccordionPanel pb={4}>
                              <Stack spacing='2'>
                                <Text
                                  textAlign='left'
                                  fontSize='lg'
                                  fontWeight='regular'
                                >
                                  Any Club Pass holder can submit a proposal.
                                  You can customize the length of time a
                                  proposal will be open for voting and the time
                                  period between when a proposal is approved and
                                  when it can be executed. Clubs can approve
                                  proposals to change these rules. Governance
                                  tokens, which are obtained by depositing
                                  funds, are used to vote with 1 token equaling
                                  1 vote.
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
                                          Execution delay
                                        </Text>
                                        <Icon as={InfoIcon} color='gray' />
                                      </HStack>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        ~ 12 hours
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack justify='space-between' direction='row'>
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Voting'
                                    contractName={
                                      contractExtensionDetails?.clubVoting
                                        .contractName
                                    }
                                    template={votingTemplate(
                                      dao?.data?.contract_address,
                                      contractExtensionDetails?.clubPass
                                        .contractAddress,
                                      contractExtensionDetails?.clubToken
                                        .contractAddress,

                                      '144',
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails?.clubVoting
                                            .contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.VOTING,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={
                                      hasExtension('Voting') ||
                                      !hasExtension('Investment Club')
                                    }
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
                                        Proposal duration
                                      </Text>
                                      <Text
                                        fontSize='lg'
                                        fontWeight='black'
                                        color='white'
                                      >
                                        ~ 3 days
                                      </Text>
                                    </Stack>
                                  </SimpleGrid>
                                </Stack>
                                <Stack justify='space-between' direction='row'>
                                  <StacksDeploy
                                    variant='primary'
                                    buttonName='Deploy Submission'
                                    contractName={
                                      contractExtensionDetails?.clubSubmission
                                        .contractName
                                    }
                                    template={submissionTemplate(
                                      dao?.data?.contract_address,
                                      contractExtensionDetails?.clubPass
                                        .contractAddress,
                                      contractExtensionDetails?.clubIC
                                        .contractAddress,
                                      contractExtensionDetails?.clubVoting
                                        .contractAddress,
                                      '144',
                                      '72',
                                      '144',
                                    )}
                                    onSuccess={(data: any) => {
                                      createExtension.mutate({
                                        club_id: dao?.data?.id,
                                        contract_address:
                                          contractExtensionDetails
                                            ?.clubSubmission.contractAddress,
                                        extension_type_id:
                                          CLUB_EXTENSION_TYPES.SUBMISSION,
                                        tx_id: data.txId,
                                      });
                                    }}
                                    isDisabled={
                                      hasExtension('Submission') ||
                                      !hasExtension('Voting')
                                    }
                                  />
                                </Stack>
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
