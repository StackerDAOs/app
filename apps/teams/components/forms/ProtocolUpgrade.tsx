import React from 'react';
import Link from 'next/link';
import { StacksSDK } from 'sdk';
import {
  Box,
  Button,
  ButtonGroup,
  Circle,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Stack,
  Square,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Textarea,
} from 'ui';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from 'ui/components/cards';
import { useGenerateName, useTeam, useTeamAuth } from 'ui/hooks';
import { useCreateSubmission } from 'api/teams/mutations';
import { useProposalStore } from 'store';
import { findExtension } from 'utils';
import { upgradeTeamProposal } from 'utils/contracts';
import { map, size } from 'lodash';
import {
  CheckCircle,
  PlusIcon,
  MinusIcon,
  ArrowRight,
  TrashIcon,
  UndoIcon,
  LightningBolt,
} from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { DotStep } from 'ui/components/feedback';
import { getTransaction } from 'api/teams';
import { truncateAddress } from '@stacks-os/utils';

export const ProtocolUpgrade = ({ onClose }: any) => {
  const dao = useTeam();
  const team = useTeamAuth();
  const [step, setStep] = React.useState(1);
  const [addNewMemberInput, setAddNewMemberInput] = React.useState(true);
  const [isProposalDeploying, setIsProposalDeploying] = React.useState(false);

  const sdk = new StacksSDK(dao?.data?.contract_address);
  // const vaultAddress = sdk.getVaultAddress();
  const { randomName: contractName } = useGenerateName();
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const proposal = useProposalStore((state) => state.proposal);
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );
  const handleSetThresholdSelected = useProposalStore(
    (state) => state.handleSetThresholdSelected,
  );
  const updateAddedMember = useProposalStore(
    (state) => state.updateAddedMember,
  );
  const addMember = useProposalStore((state) => state.addMember);
  const removeMember = useProposalStore((state) => state.removeMember);
  const updateSignatureThreshold = useProposalStore(
    (state) => state.updateSignatureThreshold,
  );
  const updateProposalData = useProposalStore(
    (state) => state.updateProposalData,
  );
  const addToken = useProposalStore((state) => state.addToken);
  const clearAddedMembers = useProposalStore(
    (state) => state.clearAddedMembers,
  );
  const clearAllowlist = useProposalStore((state) => state.clearAllowlist);
  const createSubmission = useCreateSubmission();
  const codeBody = upgradeTeamProposal({
    multisigAddress: multisigExtension?.contract_address,
    addedMembers: proposal?.membersToAdd,
    // removedMembers: proposal?.memberToRemove,
    signatureThreshold: proposal?.signatureThreshold,
  });

  const onFinishDeployVaultTemplate = (payload: any) => {
    setStep(step + 1);
    setIsProposalDeploying(true);
    setTimeout(async () => {
      const { txId } = payload;
      const tx = await getTransaction(txId);
      const contractAddress = tx?.smart_contract?.contract_id;
      if (!contractAddress) {
        throw new Error('No contract address returned from transaction.');
      } else {
        try {
          const postConditions = proposal?.recipients.reduce(
            (acc, recipient) => ({
              type: 'stacks',
              from: vaultExtension?.contract_address,
              amount: acc.amount + parseInt(recipient.amount, 10),
            }),
            {
              type: 'stacks',
              from: vaultExtension?.contract_address,
              amount: 0,
            },
          );
          const submission = {
            title: proposal?.data?.title,
            description: proposal?.data?.description,
            body: proposal?.data?.body,
            contract_address: tx?.smart_contract?.contract_id,
            tx_id: txId,
            submitted_by: tx?.sender_address,
            team_id: dao?.data?.id,
          };
          createSubmission.mutate({
            ...submission,
            ...(proposal?.isTransferSelected && {
              post_conditions: postConditions,
            }),
          });
        } catch (e: any) {
          console.error({ e });
        } finally {
          setIsProposalDeploying(false);
        }
      }
    }, 1000);
  };

  if (step === 3) {
    return (
      <Stack spacing='6' justify='center' px='8' m='0 auto' maxW='4xl'>
        <Stack spacing='3' align='center' justify='center' h='50vh'>
          <Icon as={CheckCircle} color='primary.900' boxSize='12' />
          <Text
            fontSize='xl'
            fontWeight='bold'
            color='light.500'
            textAlign='center'
          >
            Your proposal is being deployed!
          </Text>
          <Text
            fontSize='md'
            fontWeight='light'
            color='light.500'
            textAlign='center'
            mt='4'
            maxW='md'
          >
            Once your proposal is deployed, you can submit it as a proposal to
            the DAO
          </Text>
        </Stack>
        <HStack justify='center'>
          <Link href={`/${dao?.data?.slug}/proposals`}>
            <Button variant='link' onClick={onClose}>
              View Proposals
            </Button>
          </Link>
        </HStack>
      </Stack>
    );
  }

  if (step === 2) {
    return (
      <Stack spacing='6' justify='center' px='8' m='0 auto' maxW='6xl'>
        <Stack spacing='0' align='flex-start'>
          <Text fontSize='lg' fontWeight='medium'>
            Review & Deploy
          </Text>
        </Stack>
        <Stack spacing='3'>
          <Grid templateColumns='repeat(5, 1fr)' gap={8}>
            <GridItem colSpan={5}>
              <Stack spacing='3'>
                <Tabs color='light.900' variant='unstyled' isFitted>
                  <TabList>
                    <ButtonGroup
                      bg='dark.900'
                      borderRadius='lg'
                      borderWidth='1px'
                      borderColor='dark.500'
                      w='35vw'
                    >
                      {map(
                        ['Details', 'Preview', 'On-chain', 'Code'],
                        (item) => (
                          <Tab
                            key={item}
                            borderRadius='lg'
                            color='light.500'
                            // w='50%'
                            fontSize='sm'
                            _selected={{
                              color: 'light.900',
                              bg: 'dark.700',
                            }}
                          >
                            {item}
                          </Tab>
                        ),
                      )}
                    </ButtonGroup>
                  </TabList>
                  <TabPanels h='55vh' overflow='hidden' overflowY='scroll'>
                    <TabPanel px='0'>
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                      >
                        <Stack
                          as='form'
                          pointerEvents={isProposalDeploying ? 'none' : 'auto'}
                          filter={isProposalDeploying ? 'blur(1px)' : 'none'}
                        >
                          <FormControl>
                            <Stack spacing='4'>
                              <Grid templateColumns='repeat(5, 1fr)' gap='4'>
                                <GridItem colSpan={5}>
                                  <FormControl>
                                    <FormLabel
                                      htmlFor='name'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      Title
                                    </FormLabel>
                                    <Input
                                      id='title'
                                      autoComplete='off'
                                      placeholder='Give your proposal a name'
                                      size='md'
                                      value={proposal?.data?.title}
                                      onChange={(e) =>
                                        updateProposalData({
                                          ...proposal.data,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </FormControl>
                                </GridItem>
                                <GridItem colSpan={5}>
                                  <FormControl>
                                    <FormLabel
                                      htmlFor='name'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      TL;DR
                                    </FormLabel>
                                    <Textarea
                                      id='description'
                                      autoComplete='off'
                                      placeholder='In three sentences or less, explain your proposal'
                                      size='md'
                                      rows={2}
                                      value={proposal?.data?.description}
                                      onChange={(e) =>
                                        updateProposalData({
                                          ...proposal.data,
                                          description: e.target.value,
                                        })
                                      }
                                    />
                                  </FormControl>
                                </GridItem>
                                <GridItem colSpan={5}>
                                  <FormControl>
                                    <FormLabel
                                      htmlFor='body'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      Description
                                    </FormLabel>
                                    <Textarea
                                      id='body'
                                      autoComplete='off'
                                      placeholder='Describe your proposal in detail'
                                      size='md'
                                      rows={8}
                                      value={proposal?.data?.body}
                                      onChange={(e) =>
                                        updateProposalData({
                                          ...proposal.data,
                                          body: e.target.value,
                                        })
                                      }
                                    />
                                  </FormControl>
                                </GridItem>
                              </Grid>
                            </Stack>
                          </FormControl>
                        </Stack>
                      </motion.div>
                    </TabPanel>
                    <TabPanel px='0'>
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                      >
                        <Card h='fit-content' bg='dark.900' border='none'>
                          <Stack spacing='2'>
                            <Stack spacing='6'>
                              <Stack spacing='2'>
                                <Tag
                                  color='orange.500'
                                  bg='dark.800'
                                  alignSelf='self-start'
                                  size='sm'
                                  borderRadius='3xl'
                                >
                                  <Text as='span' fontWeight='regular'>
                                    Status
                                  </Text>
                                </Tag>
                                <Heading
                                  fontSize='3xl'
                                  fontWeight='black'
                                  color='light.900'
                                >
                                  {proposal?.data?.title
                                    ? proposal?.data?.title
                                    : 'Untitled'}
                                </Heading>
                                <Text
                                  color='gray'
                                  fontSize='lg'
                                  fontWeight='light'
                                  letterSpacing='tight'
                                >
                                  {proposal?.data?.description
                                    ? proposal?.data?.description
                                    : 'TL;DR'}
                                </Text>
                                <Text
                                  color='light.900'
                                  fontSize='lg'
                                  fontWeight='regular'
                                >
                                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                    {proposal?.data?.body.replace(
                                      /\n/gi,
                                      '&nbsp; \n',
                                    )}
                                  </ReactMarkdown>
                                </Text>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Card>
                      </motion.div>
                    </TabPanel>
                    <TabPanel px='0'>
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                      >
                        <Card h='fit-content' bg='dark.900' border='none'>
                          <Stack spacing='2'>
                            <Stack spacing='6'>
                              {size(proposal?.membersToAdd) > 0 && (
                                <Stack spacing='2'>
                                  <Box>
                                    <Text
                                      fontSize='md'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      Added Members
                                    </Text>
                                  </Box>
                                  {map(proposal?.membersToAdd, (member) => (
                                    <HStack
                                      align='space-between'
                                      justify='space-between'
                                    >
                                      <HStack spacing='3'>
                                        <Circle
                                          size='8'
                                          bg='dark.800'
                                          borderWidth='1px'
                                          borderColor='dark.500'
                                        >
                                          <Icon
                                            as={PlusIcon}
                                            boxSize='4'
                                            color='secondary.900'
                                          />
                                        </Circle>
                                        <Stack spacing='1'>
                                          <Text
                                            color='light.900'
                                            fontSize='sm'
                                            fontWeight='semibold'
                                          >
                                            {truncateAddress(member)}
                                          </Text>
                                        </Stack>
                                      </HStack>
                                    </HStack>
                                  ))}
                                </Stack>
                              )}
                              {size(proposal?.membersToRemove) > 0 && (
                                <Stack spacing='2'>
                                  <Box>
                                    <Text
                                      fontSize='md'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      Removed Members
                                    </Text>
                                  </Box>
                                  {map(proposal?.membersToRemove, (member) => (
                                    <HStack
                                      align='space-between'
                                      justify='space-between'
                                    >
                                      <HStack spacing='3'>
                                        <Circle
                                          size='8'
                                          bg='dark.800'
                                          borderWidth='1px'
                                          borderColor='dark.500'
                                        >
                                          <Icon
                                            as={MinusIcon}
                                            boxSize='4'
                                            color='secondary.900'
                                          />
                                        </Circle>
                                        <Stack spacing='1'>
                                          <Text
                                            color='light.900'
                                            fontSize='sm'
                                            fontWeight='semibold'
                                          >
                                            {truncateAddress(member)}
                                          </Text>
                                        </Stack>
                                      </HStack>
                                    </HStack>
                                  ))}
                                </Stack>
                              )}
                              {proposal?.signatureThreshold && (
                                <Stack spacing='2'>
                                  <Box>
                                    <Text
                                      fontSize='md'
                                      fontWeight='light'
                                      color='gray'
                                    >
                                      New Signature Threshold
                                    </Text>
                                  </Box>
                                  <HStack
                                    align='space-between'
                                    justify='space-between'
                                  >
                                    <HStack spacing='3'>
                                      <Circle
                                        size='8'
                                        bg='dark.800'
                                        borderWidth='1px'
                                        borderColor='dark.500'
                                      >
                                        <Icon
                                          as={LightningBolt}
                                          boxSize='4'
                                          color='secondary.900'
                                        />
                                      </Circle>
                                      <Stack spacing='1'>
                                        <Text
                                          color='light.900'
                                          fontSize='sm'
                                          fontWeight='semibold'
                                        >
                                          {proposal?.signatureThreshold}{' '}
                                          signatures required
                                        </Text>
                                      </Stack>
                                    </HStack>
                                  </HStack>
                                </Stack>
                              )}
                            </Stack>
                          </Stack>
                        </Card>
                      </motion.div>
                    </TabPanel>
                    <TabPanel px='0'>
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                      >
                        <Card h='fit-content' bg='dark.900' border='none'>
                          <Stack spacing='2'>
                            <Text
                              fontSize='sm'
                              fontWeight='semibold'
                              color='gray'
                            >
                              <SyntaxHighlighter
                                language='clojure'
                                style={atomDark}
                              >
                                {codeBody}
                              </SyntaxHighlighter>
                            </Text>
                          </Stack>
                        </Card>
                      </motion.div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
        <HStack justify='space-between'>
          <Button
            size='sm'
            variant='link'
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Back
          </Button>
          <Stack align='center'>
            <HStack spacing='3'>
              {[1, 2].map((currentStep) => (
                <DotStep
                  key={currentStep}
                  cursor='pointer'
                  onClick={() => setStep(currentStep)}
                  isActive={currentStep === step}
                />
              ))}
            </HStack>
          </Stack>
          <Button
            variant='secondary'
            size='sm'
            isDisabled={
              !proposal?.data?.title ||
              !proposal?.data?.body ||
              !proposal?.data?.description
            }
            onClick={() => {
              sdk.deployer.deployTeamUpgrade({
                contractName,
                multisigAddress: multisigExtension?.contract_address,
                addedMembers: proposal?.membersToAdd,
                // removedMembers: proposal?.removedMembers,
                signatureThreshold: proposal?.signatureThreshold,
                onFinish: onFinishDeployVaultTemplate,
              });
            }}
          >
            Deploy Proposal
          </Button>
        </HStack>
      </Stack>
    );
  }

  return (
    <Stack spacing='6' justify='center' px='8' m='0 auto' maxW='3xl'>
      <Stack spacing='0' align='flex-start'>
        <Text fontSize='lg' fontWeight='medium'>
          Governance Proposal
        </Text>
        <Text color='light.500' fontSize='sm' maxW='lg'>
          Add/remove members, change the signature threshold, or upgrade to a
          full DAO by enabling new extensions.
        </Text>
      </Stack>
      <Stack spacing='3'>
        <Card h='fit-content' bg='dark.800'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '3', md: '3' }}
            spacing='2'
            _hover={{
              cursor: 'pointer',
              borderRadius: 'lg',
              bg: 'dark.800',
            }}
          >
            <HStack spacing='3' justify='space-between'>
              <Stack spacing='2'>
                <HStack align='flex-start' spacing='4'>
                  <Stack spacing='1' maxW='lg'>
                    <Heading size='sm' fontWeight='black'>
                      Add/remove members
                    </Heading>
                    <Text fontSize='sm' fontWeight='light' color='gray'>
                      Enter a STX address to add or remove an exisiting member
                      from the Team.
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
              <HStack spacing='3'>
                <Square
                  size='8'
                  bg='transparent'
                  color='inverted'
                  borderRadius='lg'
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAddedMembers();
                    setAddNewMemberInput(true);
                  }}
                >
                  <Icon as={UndoIcon} boxSize='4' />
                </Square>
              </HStack>
            </HStack>
          </Stack>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.75, type: 'linear' }}
          >
            <Stack
              spacing='6'
              px={{ base: '6', md: '6' }}
              py={{ base: '6', md: '6' }}
              bg='dark.900'
              borderRadius='lg'
            >
              <Stack as='form'>
                <FormControl>
                  <Stack spacing='3'>
                    <Grid
                      templateColumns='repeat(5, 1fr)'
                      gap={6}
                      alignItems='center'
                    >
                      <GridItem colSpan={5}>
                        <Stack spacing='3'>
                          <HStack
                            spacing='3'
                            align='baseline'
                            justify='space-between'
                          >
                            <Tag
                              color='blue.500'
                              bg='dark.800'
                              alignSelf='self-start'
                              size='sm'
                              borderRadius='3xl'
                            >
                              <Text as='span' fontWeight='regular'>
                                {proposal.membersToAdd.length === 1
                                  ? `${proposal.membersToAdd.length} member added`
                                  : `${proposal.membersToAdd.length} members added`}
                              </Text>
                            </Tag>
                            {size(proposal?.membersToAdd) > 0 && (
                              <Button
                                variant='default'
                                leftIcon={<PlusIcon color='dark.900' />}
                                isDisabled={
                                  size(proposal?.membersToAdd) === 0 ||
                                  !!proposal?.addedMemberDetails ||
                                  addNewMemberInput
                                }
                                size='xs'
                                onClick={
                                  addNewMemberInput
                                    ? () => {}
                                    : () =>
                                        setAddNewMemberInput(!addNewMemberInput)
                                }
                              >
                                <Text as='span' fontSize='sm'>
                                  Add another member
                                </Text>
                              </Button>
                            )}
                          </HStack>
                          {map(proposal?.membersToAdd, (member, index) => (
                            <HStack
                              key={index}
                              justify='space-between'
                              align='center'
                              spacing='6'
                            >
                              <Input
                                id='amount'
                                autoComplete='off'
                                isDisabled
                                size='lg'
                                color='gray'
                                value={member}
                              />
                              <Square
                                size='8'
                                bg='dark.500'
                                color='inverted'
                                borderRadius='lg'
                              >
                                <Icon
                                  as={TrashIcon}
                                  boxSize='4'
                                  onClick={
                                    size(proposal?.membersToAdd) === 1
                                      ? () => {
                                          removeMember(member);
                                          setAddNewMemberInput(true);
                                        }
                                      : () => removeMember(member)
                                  }
                                />
                              </Square>
                            </HStack>
                          ))}
                          {addNewMemberInput && (
                            <HStack
                              justify='space-between'
                              align='center'
                              spacing='6'
                            >
                              <Input
                                id='add-member'
                                autoComplete='off'
                                placeholder='SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'
                                size='lg'
                                value={proposal.addedMemberDetails}
                                onChange={(e) =>
                                  updateAddedMember(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addMember(proposal.addedMemberDetails);
                                    setAddNewMemberInput(false);
                                  }
                                }}
                              />
                              <Square
                                size='8'
                                bg={
                                  proposal?.addedMemberDetails
                                    ? 'dark.500'
                                    : 'dark.800'
                                }
                                color={
                                  proposal?.addedMemberDetails
                                    ? 'light.900'
                                    : 'gray'
                                }
                                borderRadius='lg'
                              >
                                <Icon
                                  as={PlusIcon}
                                  boxSize='4'
                                  onClick={
                                    proposal?.addedMemberDetails
                                      ? () => {
                                          addMember(
                                            proposal?.addedMemberDetails,
                                          );
                                          setAddNewMemberInput(false);
                                        }
                                      : () => {}
                                  }
                                />
                              </Square>
                            </HStack>
                          )}
                        </Stack>
                      </GridItem>
                    </Grid>
                  </Stack>
                </FormControl>
              </Stack>
            </Stack>
          </motion.div>
        </Card>
        <Card
          h='fit-content'
          bg={proposal?.isSetThresholdSelected ? 'dark.800' : 'dark.900'}
        >
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '3', md: '3' }}
            spacing='2'
            onClick={() =>
              handleSetThresholdSelected(!proposal?.isSetThresholdSelected)
            }
            _hover={{
              cursor: 'pointer',
              borderRadius: 'lg',
              bg: 'dark.800',
            }}
          >
            <HStack spacing='3' justify='space-between'>
              <Stack spacing='2'>
                <HStack align='flex-start' spacing='4'>
                  <Stack spacing='1' maxW='lg'>
                    <Heading size='sm' fontWeight='black'>
                      Set Signature Threshold
                    </Heading>
                    <Text fontSize='sm' fontWeight='light' color='gray'>
                      The number of signatures required to execute a proposal.
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
              <HStack spacing='3'>
                <Square
                  size='8'
                  bg='transparent'
                  color='inverted'
                  borderRadius='lg'
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAllowlist();
                  }}
                >
                  <Icon as={UndoIcon} boxSize='4' />
                </Square>
                <Square
                  size='8'
                  bg='dark.500'
                  color='inverted'
                  borderRadius='lg'
                >
                  {proposal.isSetThresholdSelected ? (
                    <Icon as={MinusIcon} boxSize='4' />
                  ) : (
                    <Icon as={PlusIcon} boxSize='4' />
                  )}
                </Square>
              </HStack>
            </HStack>
          </Stack>
          {proposal?.isSetThresholdSelected && (
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.75, type: 'linear' }}
            >
              <Stack
                spacing='6'
                px={{ base: '6', md: '6' }}
                py={{ base: '6', md: '6' }}
                bg='dark.900'
                borderRadius='lg'
              >
                <Stack as='form'>
                  <FormControl>
                    <Stack spacing='3'>
                      <Grid
                        templateColumns='repeat(7, 1fr)'
                        gap='4'
                        alignItems='center'
                      >
                        <GridItem colSpan={4}>
                          <FormLabel
                            htmlFor='name'
                            fontWeight='light'
                            color='light.500'
                          >
                            New Signature Threshold
                          </FormLabel>
                          <InputGroup>
                            <Input
                              id='address'
                              autoComplete='off'
                              placeholder={team?.data?.signalsRequired.toString()}
                              size='lg'
                              value={proposal.signatureThreshold}
                              onChange={(e) =>
                                updateSignatureThreshold(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addToken(proposal.tokenAddress);
                                }
                              }}
                            />
                          </InputGroup>
                          <FormHelperText fontWeight='light' color='gray'>
                            Make sure to set the signature threshold equal to or
                            less than the number of current members on your
                            team, including any changes you&apos;ve made above.
                          </FormHelperText>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </FormControl>
                </Stack>
              </Stack>
            </motion.div>
          )}
        </Card>
      </Stack>
      <HStack justify='space-between'>
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            handleSelectTemplate('');
          }}
        >
          Back
        </Button>
        <Stack align='center'>
          <HStack spacing='3'>
            {[1, 2].map((currentStep) => (
              <DotStep
                key={currentStep}
                cursor='pointer'
                onClick={() => setStep(currentStep)}
                isActive={currentStep === step}
              />
            ))}
          </HStack>
        </Stack>
        <Button
          size='sm'
          variant='dark'
          rightIcon={<ArrowRight />}
          onClick={() => setStep(step + 1)}
        >
          Continue
        </Button>
      </HStack>
    </Stack>
  );
};
