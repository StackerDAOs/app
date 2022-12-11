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
  Stack,
  Square,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { Card } from 'ui/components/cards';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { useProposalStore } from 'store';
import { size } from 'lodash';
import { PlusIcon, MinusIcon } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { DotStep } from 'ui/components/feedback';
import { getTransaction } from 'api/teams';

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
  const [step, setStep] = React.useState(1);
  const [proposalContractAddress, setProposalContractAddress] =
    React.useState('');
  const sdk = new StacksSDK(
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sour-copper-pike',
  ); // TODO: get core address from useTeam hook
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
  const addToken = useProposalStore((state) => state.addToken);

  if (step === 3) {
    return (
      <Stack
        spacing='6'
        px={{ base: '8', md: '8' }}
        py={{ base: '8', md: '8' }}
        justify='center'
      >
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
        <Stack spacing='3'>
          <Card h='fit-content' bg='dark.900'>
            <Stack spacing='0'>
              <Stack
                px={{ base: '6', md: '6' }}
                py={{ base: '6', md: '6' }}
                spacing='2'
              >
                <Stack spacing='3'>
                  <Stack spacing='0'>
                    <Grid
                      templateColumns='repeat(5, 1fr)'
                      gap={8}
                      alignItems='center'
                      justifyItems='flex-end'
                    >
                      <GridItem colSpan={{ base: 2, md: 4 }}>
                        <Stack spacing='2'>
                          {size([]) < 6 && (
                            <Tag
                              color='orange.500'
                              bg='dark.800'
                              alignSelf='self-start'
                              size='sm'
                              borderRadius='3xl'
                            >
                              <Text as='span' fontWeight='regular'>
                                Need to finish deploying extensions
                              </Text>
                            </Tag>
                          )}
                          <HStack align='flex-start' spacing='4'>
                            <Stack spacing='1' maxW='lg'>
                              <Heading size='md' fontWeight='black'>
                                Deploy Proposal Contract
                              </Heading>
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                The smart contract code that will automatically
                                execute the proposal.
                              </Text>
                            </Stack>
                          </HStack>
                        </Stack>
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 1 }}>
                        <Button
                          variant='primary'
                          onClick={() => {
                            sdk.deployer.deployVaultTemplate({
                              contractName: 'proposal',
                              vaultAddress:
                                'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rolling-purple-tiglon',
                              recipients: proposal.recipients,
                              allowlist: proposal.allowlist,
                              onFinish: async (data) => {
                                console.log(data);
                                const tx = await getTransaction(data?.txId);
                                setProposalContractAddress(
                                  tx?.smart_contract?.contract_id,
                                );
                              },
                            });
                          }}
                        >
                          Deploy
                        </Button>
                      </GridItem>
                    </Grid>
                  </Stack>
                </Stack>
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
                <Stack spacing='3'>
                  <Stack spacing='0'>
                    <Grid
                      templateColumns='repeat(5, 1fr)'
                      gap={8}
                      alignItems='center'
                    >
                      <GridItem colSpan={{ base: 2, md: 4 }}>
                        <Stack spacing='2'>
                          <Tag
                            color='orange.500'
                            bg='dark.800'
                            alignSelf='self-start'
                            size='sm'
                            borderRadius='3xl'
                          >
                            <Text as='span' fontWeight='regular'>
                              Waiting for initialization contract
                            </Text>
                          </Tag>
                          <HStack align='flex-start' spacing='4'>
                            <Stack spacing='1' maxW='lg'>
                              <Heading size='md' fontWeight='black'>
                                Submit Proposal
                              </Heading>
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                Submit your proposal to the Team.{' '}
                                {proposalContractAddress}
                              </Text>
                            </Stack>
                          </HStack>
                        </Stack>
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 1 }}>
                        <Button
                          variant='primary'
                          onClick={() =>
                            sdk.submit({
                              extensionAddress:
                                'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.aggressive-lavender-pinniped',
                              proposalAddress: proposalContractAddress,
                            })
                          }
                        >
                          Propose
                        </Button>
                      </GridItem>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
        <Stack justify='flex-start' direction='row'>
          <Button
            size='sm'
            variant='link'
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Back
          </Button>
        </Stack>
      </Stack>
    );
  }

  if (step === 2) {
    return (
      <Stack
        spacing='6'
        px={{ base: '8', md: '8' }}
        py={{ base: '8', md: '8' }}
        justify='center'
      >
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
        <FormControl>
          <Stack spacing='3'>
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
                    value=''
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
                    value=''
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
                    rows={15}
                    value=''
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Stack>
        </FormControl>
        <Stack justify='space-between' direction='row'>
          <Button
            size='sm'
            variant='link'
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Back
          </Button>
          <Button size='sm' variant='default' onClick={() => setStep(step + 1)}>
            Continue
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '8', md: '8' }}
      justify='center'
    >
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
                        onClick={() => addRecipient(proposal.recipientDetails)}
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
                            onChange={(e) => updateTokenAddress(e.target.value)}
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
      <Stack justify='space-between' direction='row'>
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            handleSelectTemplate('');
          }}
        >
          Back
        </Button>
        <Button size='sm' variant='default' onClick={() => setStep(step + 1)}>
          Continue
        </Button>
      </Stack>
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
        <Button size='sm' variant='default' onClick={() => {}}>
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export const CreateProposal = (props: ProposalDrawerProps) => {
  const proposal = useProposalStore((state) => state.proposal);
  const { title } = props;
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='lg'
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
            <Breadcrumb spacing='2'>
              <BreadcrumbItem isCurrentPage color='gray'>
                <BreadcrumbLink
                  href='#'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  Create Proposal
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button variant='dark' size='sm' onClick={onClose}>
              Cancel
            </Button>
          </Flex>
          <DrawerBody p='0'>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
