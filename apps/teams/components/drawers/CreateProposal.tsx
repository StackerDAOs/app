import React from 'react';
import { StacksSDK } from 'sdk';
import type { ButtonProps } from 'ui';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  FormControl,
  FormLabel,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Stack,
  Square,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { useAccount } from 'ui/components';
import { Card } from 'ui/components/cards';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { useGenerateName, useTeam, useTeamSubmissions } from 'ui/hooks';
import { useCreateSubmission, useCreateProposal } from 'api/teams/mutations';
import { useProposalStore } from 'store';
import { size } from 'lodash';
import { findExtension } from 'utils';
import { PlusIcon, MinusIcon, ArrowRight } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { DotStep } from 'ui/components/feedback';
import { getTransaction } from 'api/teams';
import { truncateAddress } from '@stacks-os/utils';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

const templateOptions = [
  {
    id: '1',
    label: 'Asset Management',
    name: 'Vault and assets',
    description: 'Transfer assets, add new tokens to allowlist, etc.',
  },
  {
    id: '2',
    label: 'NFT',
    name: 'NFT Marketplace',
    description: 'Buy and sell NFTs, manage your NFT collection, etc.',
  },
  {
    id: '3',
    label: 'Core Protocol',
    name: 'Protocol upgrades',
    description: 'Change membership, governance parameters, etc.',
  },
];

const TemplateSelect = () => {
  const proposal = useProposalStore((state) => state.proposal);
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );

  return (
    <Stack spacing='6' justify='center'>
      <Box>
        <Text fontSize='lg' fontWeight='medium'>
          Select a template
        </Text>
        <Text color='light.500' fontSize='sm' maxW='lg'>
          Start building out your proposal by choosing from the options below.
        </Text>
      </Box>
      <Stack spacing='3'>
        <FormControl>
          <RadioCardGroup
            defaultValue='1'
            onChange={(value) => {
              handleSelectTemplate(value);
            }}
            value={proposal.selectedTemplate}
            spacing='3'
          >
            {templateOptions?.map((option) => (
              <RadioCard
                key={option.id}
                value={option.id}
                p='5'
                borderRadius='lg'
                _hover={{
                  bg: 'dark.800',
                  borderColor: 'secondary.900',
                }}
              >
                <Stack
                  spacing='2'
                  _hover={{
                    cursor: 'pointer',
                    borderRadius: 'lg',
                    bg: 'dark.800',
                  }}
                >
                  <HStack spacing='3' justify='space-between'>
                    <Stack spacing='2'>
                      <Tag
                        color='blue.500'
                        bg='dark.800'
                        alignSelf='self-start'
                        size='sm'
                        borderRadius='3xl'
                      >
                        <Text as='span' fontWeight='regular'>
                          {option.label}
                        </Text>
                      </Tag>
                      <HStack align='flex-start' spacing='4'>
                        <Stack spacing='1' maxW='lg'>
                          <Heading size='sm' fontWeight='black'>
                            {option.name}
                          </Heading>
                          <Text fontSize='sm' fontWeight='light' color='gray'>
                            {option.description}
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                  </HStack>
                </Stack>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};

const VaultAndAssetManagement = () => {
  const dao = useTeam();
  const [step, setStep] = React.useState(1);

  const sdk = new StacksSDK(dao?.data?.contract_address);
  // const vaultAddress = sdk.getVaultAddress();
  const { randomName: contractName } = useGenerateName();
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const proposal = useProposalStore((state) => state.proposal);
  const handleSelectTemplate = useProposalStore(
    (state) => state.handleSelectTemplate,
  );
  const handleTransferSelect = useProposalStore(
    (state) => state.handleTransferSelected,
  );
  const handleAllowListSelect = useProposalStore(
    (state) => state.handleAllowListSelected,
  );
  const updateTransferObject = useProposalStore(
    (state) => state.updateTransferObject,
  );
  const addRecipient = useProposalStore((state) => state.addRecipient);
  const updateTokenAddress = useProposalStore(
    (state) => state.updateTokenAddress,
  );
  const updateProposalData = useProposalStore(
    (state) => state.updateProposalData,
  );
  const addToken = useProposalStore((state) => state.addToken);
  const createSubmission = useCreateSubmission();
  const onFinishDeployVaultTemplate = (payload: any) => {
    setTimeout(async () => {
      const { txId } = payload;
      const tx = await getTransaction(txId);
      const contractAddress = tx?.smart_contract?.contract_id;
      if (!contractAddress) {
        throw new Error('No contract address returned from transaction.');
      } else {
        try {
          createSubmission.mutate({
            title: proposal?.data?.title,
            description: proposal?.data?.description,
            body: proposal?.data?.body,
            contract_address: tx?.smart_contract?.contract_id,
            tx_id: txId,
            submitted_by: tx?.sender_address,
            team_id: dao?.data?.id,
            post_conditions: {},
          });
        } catch (e: any) {
          console.error({ e });
        }
      }
    }, 1000);
  };

  if (step === 4) {
    return (
      <Stack spacing='8' justify='center'>
        <Stack spacing='4'>
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
                      Incomplete
                    </Text>
                  </Tag>
                  <Heading fontSize='4xl' fontWeight='black' color='light.900'>
                    {proposal?.data?.title}
                  </Heading>
                  <Text color='gray' fontSize='md' fontWeight='regular'>
                    {proposal?.data?.description}
                  </Text>
                  <Text color='light.900' fontSize='lg' fontWeight='regular'>
                    {proposal?.data?.body}
                  </Text>
                </Stack>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <Stack spacing='6'>
                    <Stack spacing='3' filter='blur(2px)'>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          Yes (0)
                        </Text>
                        <Progress
                          colorScheme='primary'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          No (0)
                        </Text>
                        <Progress
                          colorScheme='whiteAlpha'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          Quorum ( 0)
                        </Text>
                        <Progress
                          colorScheme='gray'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                    </Stack>
                    <HStack justifyContent='center' spacing='12'>
                      <Button
                        isFullWidth
                        variant='secondary'
                        onClick={() => {
                          sdk.deployer.deployVaultTemplate({
                            contractName,
                            vaultAddress: vaultExtension?.contract_address,
                            recipients: proposal.recipients,
                            allowlist: proposal.allowlist,
                            onFinish: onFinishDeployVaultTemplate,
                          });
                          setStep(step + 1);
                        }}
                      >
                        Deploy
                      </Button>
                    </HStack>
                  </Stack>
                </motion.div>
              </Stack>
            </Stack>
          </Card>
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
              {[1, 2, 3].map((currentStep) => (
                <DotStep
                  key={currentStep}
                  cursor='pointer'
                  onClick={() => setStep(currentStep)}
                  isActive={currentStep === step}
                />
              ))}
            </HStack>
          </Stack>
          <Button visibility='hidden' />
        </HStack>
      </Stack>
    );
  }

  if (step === 3) {
    return (
      <Stack spacing='8' justify='center'>
        <Stack spacing='4'>
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
                      Incomplete
                    </Text>
                  </Tag>
                  <Heading fontSize='4xl' fontWeight='black' color='light.900'>
                    {proposal?.data?.title}
                  </Heading>
                  <Text color='gray' fontSize='md' fontWeight='regular'>
                    {proposal?.data?.description}
                  </Text>
                  <Text color='light.900' fontSize='lg' fontWeight='regular'>
                    {proposal?.data?.body}
                  </Text>
                </Stack>
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.25, type: 'linear' }}
                >
                  <Stack spacing='6'>
                    <Stack spacing='3' filter='blur(2px)'>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          Yes (0)
                        </Text>
                        <Progress
                          colorScheme='primary'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          No (0)
                        </Text>
                        <Progress
                          colorScheme='whiteAlpha'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                      <Stack>
                        <Text color='gray' fontSize='sm' fontWeight='semibold'>
                          Quorum ( 0)
                        </Text>
                        <Progress
                          colorScheme='gray'
                          borderRadius='lg'
                          size='md'
                          value={0}
                          bg='dark.500'
                        />
                      </Stack>
                    </Stack>
                    <HStack justifyContent='center' spacing='12'>
                      <Button
                        isFullWidth
                        variant='secondary'
                        onClick={() => {
                          sdk.deployer.deployVaultTemplate({
                            contractName,
                            vaultAddress: vaultExtension?.contract_address,
                            recipients: proposal.recipients,
                            allowlist: proposal.allowlist,
                            onFinish: onFinishDeployVaultTemplate,
                          });
                          setStep(step + 1);
                        }}
                      >
                        Deploy
                      </Button>
                    </HStack>
                  </Stack>
                </motion.div>
              </Stack>
            </Stack>
          </Card>
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
              {[1, 2, 3].map((currentStep) => (
                <DotStep
                  key={currentStep}
                  cursor='pointer'
                  onClick={() => setStep(currentStep)}
                  isActive={currentStep === step}
                />
              ))}
            </HStack>
          </Stack>
          <Button visibility='hidden' />
        </HStack>
      </Stack>
    );
  }

  if (step === 2) {
    return (
      <Stack spacing='8' justify='center'>
        <FormControl>
          <Stack spacing='4'>
            <Grid templateColumns='repeat(5, 1fr)' gap='4'>
              <GridItem colSpan={5}>
                <FormControl>
                  <FormLabel htmlFor='name' fontWeight='light' color='gray'>
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
                  <FormLabel htmlFor='name' fontWeight='light' color='gray'>
                    TL;DR
                  </FormLabel>
                  <Textarea
                    id='description'
                    autoComplete='off'
                    placeholder='In three sentences or less, explain your proposal'
                    size='md'
                    rows={3}
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
                  <FormLabel htmlFor='body' fontWeight='light' color='gray'>
                    Description
                  </FormLabel>
                  <Textarea
                    id='body'
                    autoComplete='off'
                    placeholder='Describe your proposal in detail'
                    size='md'
                    rows={10}
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
              {[1, 2, 3].map((currentStep) => (
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
  }

  return (
    <Stack spacing='8' justify='center'>
      <Stack spacing='4'>
        <Card
          h='fit-content'
          bg={proposal.isTransferSelected ? 'dark.800' : 'dark.900'}
        >
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '3', md: '3' }}
            spacing='2'
            onClick={() => handleTransferSelect(!proposal.isTransferSelected)}
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
                      Transfer Funds
                    </Heading>
                    <Text fontSize='sm' fontWeight='light' color='gray'>
                      Send STX, Tokens, or NFT&apos;s from your vault to a new
                      address.
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
              <Square size='8' bg='dark.500' color='inverted' borderRadius='lg'>
                {proposal.isTransferSelected ? (
                  <Icon as={MinusIcon} boxSize='4' />
                ) : (
                  <Icon as={PlusIcon} boxSize='4' />
                )}
              </Square>
            </HStack>
          </Stack>
          {proposal.isTransferSelected && (
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
                      <HStack
                        spacing='1'
                        align='baseline'
                        justify='space-between'
                      >
                        <Button
                          variant='secondary'
                          color='light.900'
                          size='xs'
                          leftIcon={<PlusIcon />}
                          onClick={() =>
                            addRecipient(proposal.recipientDetails)
                          }
                        >
                          <Text as='span' fontSize='sm'>
                            Add recipient
                          </Text>
                        </Button>
                        {proposal.recipients.length !== 0 && (
                          <Tag
                            color='blue.500'
                            bg='dark.800'
                            alignSelf='self-start'
                            size='sm'
                            borderRadius='3xl'
                          >
                            <Text as='span' fontWeight='regular'>
                              {proposal.recipients.length}
                            </Text>
                          </Tag>
                        )}
                      </HStack>
                      <Grid templateColumns='repeat(7, 1fr)' gap='4'>
                        <GridItem colSpan={2}>
                          <HStack
                            justify='space-between'
                            align='center'
                            spacing='2'
                          >
                            <InputGroup>
                              <Input
                                id='amount'
                                autoComplete='off'
                                placeholder='100'
                                size='lg'
                                value={proposal.recipientDetails.amount}
                                onChange={(e) =>
                                  updateTransferObject({
                                    ...proposal.recipientDetails,
                                    amount: e.target.value,
                                  })
                                }
                              />
                              <InputRightElement right='25px' top='4px'>
                                <HStack borderRadius='lg'>
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
                              </InputRightElement>
                            </InputGroup>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={5}>
                          <InputGroup>
                            <Input
                              id='address'
                              autoComplete='off'
                              placeholder='Recipient address'
                              size='lg'
                              value={proposal.recipientDetails.to}
                              onChange={(e) =>
                                updateTransferObject({
                                  ...proposal.recipientDetails,
                                  to: e.target.value,
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addRecipient(proposal.recipientDetails);
                                }
                              }}
                            />
                          </InputGroup>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </FormControl>
                </Stack>
              </Stack>
            </motion.div>
          )}
        </Card>
        <Card
          h='fit-content'
          bg={proposal.isAllowListSelected ? 'dark.800' : 'dark.900'}
        >
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '3', md: '3' }}
            spacing='2'
            onClick={() => handleAllowListSelect(!proposal.isAllowListSelected)}
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
                      Set Allowlist
                    </Heading>
                    <Text fontSize='sm' fontWeight='light' color='gray'>
                      Add or remove tokens and NFT&apos;s from your vaults
                      allowlist.
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
              <Square size='8' bg='dark.500' color='inverted' borderRadius='lg'>
                {proposal.isAllowListSelected ? (
                  <Icon as={MinusIcon} boxSize='4' />
                ) : (
                  <Icon as={PlusIcon} boxSize='4' />
                )}
              </Square>
            </HStack>
          </Stack>
          {proposal.isAllowListSelected && (
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
                      <HStack
                        spacing='1'
                        align='baseline'
                        justify='space-between'
                      >
                        <Button
                          variant='secondary'
                          color='light.900'
                          size='xs'
                          leftIcon={<PlusIcon />}
                          onClick={() => addToken(proposal.tokenAddress)}
                        >
                          <Text as='span' fontSize='sm'>
                            Add token
                          </Text>
                        </Button>
                        {proposal.allowlist.length !== 0 && (
                          <Tag
                            color='blue.500'
                            bg='dark.800'
                            alignSelf='self-start'
                            size='sm'
                            borderRadius='3xl'
                          >
                            <Text as='span' fontWeight='regular'>
                              {proposal.allowlist.length}
                            </Text>
                          </Tag>
                        )}
                      </HStack>
                      <Grid templateColumns='repeat(5, 1fr)' gap='4'>
                        <GridItem colSpan={5}>
                          <InputGroup>
                            <Input
                              id='address'
                              autoComplete='off'
                              placeholder='Recipient address'
                              size='lg'
                              value={proposal.tokenAddress}
                              onChange={(e) =>
                                updateTokenAddress(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addToken(proposal.tokenAddress);
                                }
                              }}
                            />
                          </InputGroup>
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
            {[1, 2, 3].map((currentStep) => (
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

const ProtocolUpgrade = () => {
  const proposal = useProposalStore((state) => state.proposal);
  const handleTransferSelect = useProposalStore(
    (state) => state.handleTransferSelected,
  );

  return (
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '8', md: '8' }}
      justify='center'
    >
      <Box>
        <Text fontSize='lg' fontWeight='medium'>
          Select a template
        </Text>
        <Text color='light.500' fontSize='sm' maxW='lg'>
          Start building out your proposal by choosing from the options below.
        </Text>
      </Box>
      <Card
        h='fit-content'
        bg={proposal.isTransferSelected ? 'dark.800' : 'dark.900'}
      >
        <Stack
          px={{ base: '6', md: '6' }}
          py={{ base: '3', md: '3' }}
          spacing='2'
          onClick={() => handleTransferSelect(!proposal.isTransferSelected)}
          _hover={{
            borderRadius: 'lg',
            bg: 'dark.800',
          }}
        >
          <HStack spacing='3' justify='space-between'>
            <Stack spacing='2'>
              <Tag
                color='blue.500'
                bg='dark.800'
                alignSelf='self-start'
                size='sm'
                borderRadius='3xl'
              >
                <Text as='span' fontWeight='regular'>
                  Asset Management
                </Text>
              </Tag>
              <HStack align='flex-start' spacing='4'>
                <Stack spacing='1' maxW='lg'>
                  <Heading size='sm' fontWeight='black'>
                    Transfer Funds
                  </Heading>
                  <Text fontSize='sm' fontWeight='light' color='gray'>
                    Send STX, Tokens, or NFT&apos;s from your vault to a new
                    address.
                  </Text>
                </Stack>
              </HStack>
            </Stack>
            <Square size='8' bg='dark.500' color='inverted' borderRadius='lg'>
              {proposal.isTransferSelected ? (
                <Icon as={MinusIcon} boxSize='4' />
              ) : (
                <Icon as={PlusIcon} boxSize='4' />
              )}
            </Square>
          </HStack>
        </Stack>
        {proposal.isTransferSelected && (
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
              py={{ base: '3', md: '3' }}
              bg='dark.900'
              borderRadius='lg'
            >
              <Stack as='form'>
                <FormControl>
                  <Stack spacing='3'>
                    <Grid templateColumns='repeat(7, 1fr)' gap='4'>
                      <GridItem colSpan={2}>
                        <HStack
                          justify='space-between'
                          align='center'
                          spacing='2'
                        >
                          <InputGroup>
                            <Input
                              id='amount'
                              autoComplete='off'
                              placeholder='100'
                              size='lg'
                              value='value'
                            />
                            <InputRightElement right='25px' top='4px'>
                              <HStack borderRadius='lg'>
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
                            </InputRightElement>
                          </InputGroup>
                        </HStack>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <InputGroup>
                          <Input
                            id='address'
                            autoComplete='off'
                            placeholder='Recipient address'
                            size='lg'
                            value='value'
                          />
                        </InputGroup>
                      </GridItem>
                    </Grid>
                    <Button
                      size='sm'
                      isFullWidth
                      variant='secondary'
                      position='relative'
                      top='1'
                      onClick={() => console.log('invalid')}
                    >
                      Add another recipient
                    </Button>
                  </Stack>
                </FormControl>
              </Stack>
            </Stack>
          </motion.div>
        )}
      </Card>
      <Stack justify='space-between' direction='row'>
        <Button size='sm' variant='link' onClick={() => {}}>
          Back
        </Button>
        <Button
          size='sm'
          variant='dark'
          rightIcon={<ArrowRight />}
          onClick={() => {}}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export const CreateProposal = (props: ProposalDrawerProps) => {
  const dao = useTeam();
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const sdk = new StacksSDK(dao?.data?.contract_address);
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const proposal = useProposalStore((state) => state.proposal);
  const { title } = props;
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submissions = useTeamSubmissions();
  const createProposal = useCreateProposal();

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={onClose}
        initialFocusRef={focusField}
      >
        <DrawerContent bg='dark.900' borderWidth='1px' borderColor='dark.500'>
          <Flex
            justify='space-between'
            align='center'
            bg='dark.800'
            borderBottomWidth='1px'
            borderBottomColor='dark.500'
            py='4'
            px={{ base: '8', md: '8' }}
          >
            <Button variant='dark' size='sm' onClick={onClose}>
              Cancel
            </Button>
            <Breadcrumb spacing='2'>
              <BreadcrumbItem isCurrentPage color='gray'>
                <BreadcrumbLink
                  href='#'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  Proposal Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <DrawerBody p='0'>
            <Stack
              px={{ base: '6', md: '6' }}
              py={{ base: '6', md: '6' }}
              spacing='2'
              maxW='7xl'
              m='0 auto'
            >
              <Grid templateColumns='repeat(9, 1fr)' gap={12}>
                <GridItem colSpan={5}>
                  <Box as='form'>
                    {!proposal.selectedTemplate && <TemplateSelect />}
                    {proposal.selectedTemplate === '1' && (
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.75, type: 'linear' }}
                      >
                        <VaultAndAssetManagement />
                      </motion.div>
                    )}
                    {proposal.selectedTemplate === '2' && (
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.75, type: 'linear' }}
                      >
                        <ProtocolUpgrade />
                      </motion.div>
                    )}
                  </Box>
                </GridItem>
                <GridItem colSpan={4}>
                  <Stack spacing='3'>
                    <Card
                      bg='dark.900'
                      border='1px solid'
                      borderColor='dark.500'
                    >
                      <Box
                        py={{ base: '3', md: '3' }}
                        px={{ base: '6', md: '6' }}
                        bg='dark.700'
                        borderTopLeftRadius='lg'
                        borderTopRightRadius='lg'
                      >
                        <HStack justify='space-between'>
                          <Text
                            fontSize='md'
                            fontWeight='medium'
                            color='light.900'
                          >
                            Submissions
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
                          {submissions?.data?.length === 0 && (
                            <HStack justify='center' cursor='default'>
                              <Text
                                fontSize='md'
                                fontWeight='light'
                                color='gray'
                              >
                                No Submissions found
                              </Text>
                            </HStack>
                          )}
                          {submissions?.data?.length !== 0 && (
                            <Stack spacing='6' py='3'>
                              {submissions?.data?.map((submission: any) => (
                                <Grid
                                  templateColumns='repeat(5, 1fr)'
                                  gap={8}
                                  alignItems='center'
                                >
                                  <GridItem colSpan={{ base: 2, md: 4 }}>
                                    <Stack spacing='2'>
                                      {size([]) < 6 && (
                                        <Tag
                                          color='yellow.500'
                                          bg='dark.800'
                                          alignSelf='self-start'
                                          size='sm'
                                          borderRadius='3xl'
                                        >
                                          <Text as='span' fontWeight='regular'>
                                            Pending
                                          </Text>
                                        </Tag>
                                      )}
                                      <HStack align='flex-start' spacing='4'>
                                        <Stack spacing='1' maxW='lg'>
                                          <Heading size='xs' fontWeight='black'>
                                            {truncateAddress(
                                              submission?.contract_address,
                                            )}
                                          </Heading>
                                        </Stack>
                                      </HStack>
                                    </Stack>
                                  </GridItem>
                                  <GridItem colSpan={{ base: 1, md: 1 }}>
                                    <Button
                                      variant='secondary'
                                      size='sm'
                                      onClick={() =>
                                        sdk.submit({
                                          extensionAddress:
                                            multisigExtension?.contract_address,
                                          proposalAddress:
                                            submission?.contract_address,
                                          onFinish(payload) {
                                            const { txId } = payload;
                                            createProposal.mutate({
                                              contract_address:
                                                submission?.contract_address,
                                              proposed_by: stxAddress as string,
                                              tx_id: txId,
                                            });
                                          },
                                        })
                                      }
                                    >
                                      Propose
                                    </Button>
                                  </GridItem>
                                </Grid>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
