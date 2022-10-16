import React from 'react';
import {
  Accordion,
  AccordionPanel,
  Button,
  Circle,
  FormControl,
  Icon,
  Image,
  Input,
  Heading,
  HStack,
  Progress,
  Grid,
  GridItem,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'ui';
import { defaultTo, map, round, size } from 'lodash';
import { Card } from 'ui/components/cards';
// import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { DashboardHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import {
  DepositButton,
  DeployBootstrapButton,
  InitializeClubButton,
  DeployNFTButton,
  DeployGovernanceTokenButton,
  DeployVaultButton,
  DeployICButton,
  DeploySubmissionButton,
  DeployVotingButton,
} from 'ui/components/buttons';
import {
  useInvestmentClub,
  useGovernanceToken,
  useDAO,
  useTransaction,
} from 'ui/hooks';
import {
  ustxToStx,
  getPercentage,
  findExtension,
  nameToSlug,
  convertToken,
  getExplorerLink,
} from 'utils';
// import { ClubsTable } from '@components/tables';
import { InfoIcon, LightningBolt } from 'ui/components/icons';
import { CustomAccordianItem } from '@components/disclosure';

const EXTENSION_SIZE = 6;
const OTHER_REQUIREMENTS_SIZE = 1;

export default function Dashboard() {
  const dao = useDAO();
  const governanceToken = useGovernanceToken();
  const investmentClub = useInvestmentClub();
  const { data: bootstrapTransaction } = useTransaction(
    dao?.data?.bootstrap_tx_id,
  );
  const { data: activationTransaction } = useTransaction(
    dao?.data?.activation_tx_id,
  );
  const [depositAmount, setDepositAmount] = React.useState('');
  const handleInputDeposit = (e: any) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    }
  };

  const isInitializing =
    dao?.data?.extensions?.length !== EXTENSION_SIZE ||
    !dao?.data?.bootstrap_tx_id;

  const isActive =
    !dao?.isFetching &&
    !dao?.isLoading &&
    dao?.data?.active &&
    activationTransaction?.tx_status === 'success';
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
    console.log({ bootstrapStatus, activationStatus });
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
    return null;
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

  if (isInitializing) {
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
              <Stack spacing='6'>
                {/* <Alert
                  bg='dark.700'
                  borderColor='dark.500'
                  borderWidth='1px'
                  color='light.900'
                  status='warning'
                  borderRadius='lg'
                  variant='left-accent'
                >
                  <AlertIcon />
                  <AlertTitle>Required</AlertTitle>
                  <AlertDescription>
                    Follow the order below when deploying extensions.
                  </AlertDescription>
                </Alert> */}
                <Card h='fit-content' bg='dark.900'>
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
                                EXTENSION_SIZE + OTHER_REQUIREMENTS_SIZE,
                                size(dao?.data?.extensions),
                              )}
                              bg='dark.500'
                            />
                            <Stack spacing='3'>
                              <Accordion defaultIndex={0}>
                                <Stack spacing='3'>
                                  <CustomAccordianItem
                                    title='Create an account'
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
                                          Club Passes are non-transferable NFTs
                                          and define your Club&apos;s
                                          membership. Governance tokens are also
                                          non-transferable, issued to Club Pass
                                          holders who deposit funds at an amount
                                          representing the deposit&apos;s pro
                                          rata share of the Club&apos;s
                                          treasury, and define a member&apos;s
                                          voting power.
                                        </Text>
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
                                              <HStack>
                                                <Text
                                                  fontSize='md'
                                                  fontWeight='light'
                                                  color='gray'
                                                >
                                                  Members
                                                </Text>
                                                <Icon
                                                  as={InfoIcon}
                                                  color='gray'
                                                />
                                              </HStack>
                                              <Text
                                                fontSize='lg'
                                                fontWeight='black'
                                                color='white'
                                              >
                                                {
                                                  dao?.data?.config
                                                    ?.memberAddresses?.length
                                                }
                                              </Text>
                                            </Stack>
                                          </SimpleGrid>
                                        </Stack>
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployNFTButton
                                            title='Deploy NFT'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            name={`${dao?.data?.slug}-nft-membership-pass`}
                                            clubId={dao?.data?.id}
                                            hasExtension={hasExtension(
                                              'NFT Membership',
                                            )}
                                            variant='primary'
                                            onDeploy={onFinish}
                                          />
                                        </Stack>
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployGovernanceTokenButton
                                            title='Deploy Token'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            name={`${dao?.data?.slug}-governance-token`}
                                            symbol={
                                              dao?.data?.config?.tokenSymbol
                                            }
                                            clubId={dao?.data?.id}
                                            hasExtension={hasExtension(
                                              'Governance Token',
                                            )}
                                            isDisabled={
                                              !hasExtension('NFT Membership')
                                            }
                                            variant='primary'
                                            onDeploy={onFinish}
                                          />
                                        </Stack>
                                      </Stack>
                                    </AccordionPanel>
                                  </CustomAccordianItem>
                                  <CustomAccordianItem
                                    title='Club and assets'
                                    progressValue={getPercentage(
                                      2,
                                      progressForClubs,
                                    )}
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
                                          Your vault will store your Club&apos;s
                                          assets, like fungible tokens and NFTs.
                                          The investment club extension helps to
                                          manage Club membership. After the
                                          initial fundraise, Club approved
                                          proposals can open a new fundraising
                                          window where the Club can issue more
                                          Club Passes to add members, accept new
                                          deposits, and issue depositors new
                                          governance tokens.
                                        </Text>
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
                                              <HStack>
                                                <Text
                                                  fontSize='md'
                                                  fontWeight='light'
                                                  color='gray'
                                                >
                                                  Whitelisted assets
                                                </Text>
                                                <Icon
                                                  as={InfoIcon}
                                                  color='gray'
                                                />
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
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployVaultButton
                                            title='Deploy Vault'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
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
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                                {
                                                  dao?.data?.config
                                                    ?.minimumDeposit
                                                }{' '}
                                                STX
                                              </Text>
                                            </Stack>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                                ~{' '}
                                                {
                                                  dao?.data?.config
                                                    ?.durationInDays
                                                }{' '}
                                                days
                                              </Text>
                                            </Stack>
                                          </SimpleGrid>
                                        </Stack>
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployICButton
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            title='Deploy Investment Club'
                                            name={`${dao?.data?.slug}-investment-club`}
                                            clubId={dao?.data?.id}
                                            nftMembershipContractAddress={
                                              nftExtension?.contract_address
                                            }
                                            governanceTokenContractAddress={
                                              governanceExtension?.contract_address
                                            }
                                            vaultContractAddress={
                                              vaultExtension?.contract_address
                                            }
                                            hasExtension={hasExtension(
                                              'Investment Club',
                                            )}
                                            isDisabled={!hasExtension('Vault')}
                                            startWindow={
                                              dao?.data?.config?.durationInDays
                                            }
                                            minimumDeposit={
                                              dao?.data?.config?.minimumDeposit
                                            }
                                            variant='primary'
                                            onDeploy={onFinish}
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
                                          Any Club Pass holder can submit a
                                          proposal. You can customize the length
                                          of time a proposal will be open for
                                          voting and the time period between
                                          when a proposal is approved and when
                                          it can be executed. Clubs can approve
                                          proposals to change these rules.
                                          Governance tokens, which are obtained
                                          by depositing funds, are used to vote
                                          with 1 token equaling 1 vote.
                                        </Text>
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
                                              <HStack>
                                                <Text
                                                  fontSize='md'
                                                  fontWeight='light'
                                                  color='gray'
                                                >
                                                  Execution delay
                                                </Text>
                                                <Icon
                                                  as={InfoIcon}
                                                  color='gray'
                                                />
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
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployVotingButton
                                            title='Deploy Voting'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            name={`${dao?.data?.slug}-voting`}
                                            clubId={dao?.data?.id}
                                            nftMembershipContractAddress={
                                              nftExtension?.contract_address
                                            }
                                            governanceTokenContractAddress={
                                              governanceExtension?.contract_address
                                            }
                                            hasExtension={hasExtension(
                                              'Voting',
                                            )}
                                            isDisabled={
                                              !hasExtension('Investment Club')
                                            }
                                            variant='primary'
                                            onDeploy={onFinish}
                                          />
                                        </Stack>
                                        <Stack
                                          py={{ base: '3', md: '3' }}
                                          spacing='2'
                                        >
                                          <SimpleGrid columns={2} spacing='4'>
                                            <Stack
                                              align='flex-start'
                                              spacing='0'
                                            >
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
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeploySubmissionButton
                                            title='Deploy Submission'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            name={`${dao?.data?.slug}-submission`}
                                            clubId={dao?.data?.id}
                                            nftMembershipContractAddress={
                                              nftExtension?.contract_address
                                            }
                                            investmentClubContractAddress={
                                              investmentClubExtension?.contract_address
                                            }
                                            votingContractAddress={
                                              votingExtension?.contract_address
                                            }
                                            hasExtension={hasExtension(
                                              'Submission',
                                            )}
                                            isDisabled={!hasExtension('Voting')}
                                            variant='primary'
                                            onDeploy={onFinish}
                                          />
                                        </Stack>
                                      </Stack>
                                    </AccordionPanel>
                                  </CustomAccordianItem>
                                  <CustomAccordianItem
                                    title='Finalize Club configuration '
                                    progressValue={getPercentage(
                                      1,
                                      dao?.data?.bootstrap_address ? 1 : 0,
                                    )}
                                    isPending={false}
                                    hasCompleted={
                                      !!dao?.data?.bootstrap_address
                                    }
                                  >
                                    <AccordionPanel pb={4}>
                                      <Stack spacing='2'>
                                        <Text
                                          textAlign='left'
                                          fontSize='lg'
                                          fontWeight='regular'
                                        >
                                          The boostrap contract initializes your
                                          Club. Once deployed, you&apos;ll have
                                          to make a contract call, and your Club
                                          will be ready to raise funds!
                                        </Text>
                                        <Stack
                                          justify='space-between'
                                          direction='row'
                                        >
                                          <DeployBootstrapButton
                                            variant='primary'
                                            coreDao={
                                              dao?.data?.contract_address
                                            }
                                            title='Deploy Bootstrap'
                                            slug={nameToSlug(dao?.data?.name)}
                                            extensions={map(
                                              dao?.data?.extensions,
                                            )}
                                            isDisabled={!hasExtension('Voting')}
                                            memberAddresses={
                                              dao?.data?.config?.memberAddresses
                                            }
                                            onDeploy={() =>
                                              console.log('init!')
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
                      </GridItem>
                    </Grid>
                  </Stack>
                </Card>
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
          {isActive ? null : renderStatusCard}
          <Stack
            spacing='8'
            pb='16'
            mt='6'
            filter={isActive ? 'none' : 'blur(3px)'}
            pointerEvents={isActive ? 'auto' : 'none'}
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
        {/* <Stack spacing='6'>
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
        </Stack> */}
        {/* <Stack spacing='8' pb='16'>
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
        </Stack> */}
      </Wrapper>
    </motion.div>
  );
}

Dashboard.getLayout = (page: any) => (
  <AppLayout header={<DashboardHeader />}>{page}</AppLayout>
);
