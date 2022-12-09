import React from 'react';
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
  useDisclosure,
} from 'ui';
import { Card } from 'ui/components/cards';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import { useProposalStore } from 'store';
import {
  WalletIcon,
  UpgradeIcon,
  PlusIcon,
  MinusIcon,
  ExtensionOutline,
  MarketplaceIcon,
} from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

const templateOptions = [
  {
    id: '1',
    icon: WalletIcon,
    name: 'Vault and asset management',
    description: 'Transfer assets, add new tokens to allowlist, etc.',
  },
  {
    id: '2',
    icon: MarketplaceIcon,
    name: 'NFT Marketplace',
    description: 'Buy and sell NFTs, manage your NFT collection, etc.',
  },
  {
    id: '3',
    icon: UpgradeIcon,
    name: 'Protocol upgrades',
    description: 'Change membership, governance parameters, etc.',
  },
  {
    id: '3',
    icon: ExtensionOutline,
    name: 'Manage extensions',
    description: 'Manage your protocol extensions, add new extensions, etc.',
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
                <HStack spacing='3'>
                  <Square
                    size='8'
                    bg='dark.500'
                    color='inverted'
                    borderRadius='lg'
                  >
                    <Icon
                      as={option.icon}
                      boxSize={{ base: '4', md: '5' }}
                      color='primary.900'
                    />
                  </Square>
                  <Stack spacing='0'>
                    <Text
                      color='emphasized'
                      fontWeight='semibold'
                      fontSize='md'
                    >
                      {option.name}
                    </Text>
                    <Text color='light.500' fontSize='sm' maxW='sm'>
                      {option.description}
                    </Text>
                  </Stack>
                </HStack>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};

const VaultAndAssetManagement = () => {
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

  return (
    <Stack
      spacing='6'
      px={{ base: '8', md: '8' }}
      py={{ base: '8', md: '8' }}
      justify='center'
    >
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
                  <FormLabel
                    htmlFor='name'
                    fontWeight='light'
                    color='light.500'
                  >
                    Member Address
                  </FormLabel>
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
              py={{ base: '3', md: '3' }}
              bg='dark.900'
              borderRadius='lg'
            >
              <Stack as='form'>
                <FormControl>
                  <FormLabel
                    htmlFor='name'
                    fontWeight='light'
                    color='light.500'
                  >
                    Member Address
                  </FormLabel>
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
        <Button
          size='sm'
          variant='link'
          onClick={() => {
            handleSelectTemplate('');
          }}
        >
          Back
        </Button>
        <Button size='sm' variant='default' onClick={() => {}}>
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
                  <FormLabel
                    htmlFor='name'
                    fontWeight='light'
                    color='light.500'
                  >
                    Member Address
                  </FormLabel>
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
