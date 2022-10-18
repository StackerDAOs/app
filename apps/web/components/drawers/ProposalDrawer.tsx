import React from 'react';
import type { ButtonProps } from 'ui';
import {
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Square,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { useForm, Controller } from 'ui/components';
import { RadioCardGroup, RadioCard } from 'ui/components/forms';
import {
  GearIcon,
  MarketplaceIcon,
  TransferIcon,
  UpgradeIcon,
  VerifyIcon,
  WalletIcon,
} from 'ui/components/icons';
import { useSteps } from 'ui/store';
import { shortenAddress, truncateAddress } from '@stacks-os/utils';
import { Card } from 'ui/components/cards';
import { DeployProposalButton } from 'ui/components/buttons';
import { sendFunds } from 'utils/contracts';

interface ProposalDrawerProps extends ButtonProps {
  title: string;
}

export const ProposalDrawer = (props: ProposalDrawerProps) => {
  const { title } = props;
  const [proposalContractAddress, setProposalContractAddress] =
    React.useState('');
  const focusField = React.useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentStep, setStep } = useSteps();
  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      template: '0',
      vaultType: '0',
      amount: '',
      address: '',
      title: '',
      description: '',
      body: '',
    },
  });
  const selectedTemplate = getValues('template');
  const selectedVaultType = getValues('vaultType');
  let codeBody: string = '';
  switch (selectedVaultType) {
    case '1':
      codeBody = sendFunds(
        [
          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          'ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50',
        ],
        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stackerdao-vault',
        '10000000',
      );
      break;
    case '2':
      codeBody = sendFunds(
        [
          'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          'ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50',
          'ST2Y2SFNVZBT8SSZ00XXKH930MCN0RFREB2GQG7CJ',
        ],
        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stackerdao-vault',
        '10000000',
      );
      break;
    default:
      codeBody = '';
  }

  const templateOptions = [
    {
      id: '1',
      icon: WalletIcon,
      name: 'Vault and asset management',
      description:
        'Transfer and manage your assets, add new tokens to whitelist, etc.',
    },
    {
      id: '2',
      icon: MarketplaceIcon,
      name: 'NFT Marketplace',
      description:
        'List and sell your NFTs, create auctions, manage your collections, etc.',
    },
    {
      id: '3',
      icon: UpgradeIcon,
      name: 'Protocol upgrades',
      description:
        'Upgrade your protocol configuration, add new extensions, etc.',
    },
  ];

  const vaultOptions = [
    {
      id: '1',
      icon: VerifyIcon,
      name: 'Whitelist assets',
      description:
        'Assets that are whitelisted can be sent and received by the vault.',
    },
    {
      id: '2',
      icon: TransferIcon,
      name: 'Transfer assets',
      description:
        'Initiate a transfer to a single address (or many), or to another smart contract.',
    },
  ];

  const SelectTemplate = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('step', data);
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={GearIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Build your proposal
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            Start building out your proposal by choosing from the options below.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Controller
              control={control}
              name='template'
              render={({ field: { onChange, value } }) => (
                <RadioCardGroup
                  defaultValue='1'
                  onChange={onChange}
                  value={value}
                  spacing='3'
                >
                  {templateOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
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
                          <Text color='light.500' fontSize='sm'>
                            {option.description}
                          </Text>
                        </Stack>
                      </HStack>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack justify='flex-end' direction='row'>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const VaultManagement = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={WalletIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Vault Management
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            Whitelist new tokens and NFTs, transfer assets, etc.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Controller
              control={control}
              name='vaultType'
              render={({ field: { onChange, value } }) => (
                <RadioCardGroup
                  defaultValue='1'
                  onChange={onChange}
                  value={value}
                  spacing='3'
                  direction='row'
                >
                  {vaultOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
                    >
                      <Stack spacing='1'>
                        <Stack align='baseline'>
                          <Circle bg='dark.500' size='8' mb='3'>
                            <Icon
                              as={option.icon}
                              boxSize={{ base: '4', md: '5' }}
                              color='primary.900'
                            />
                          </Circle>
                          <Heading
                            mt='0 !important'
                            size='sm'
                            fontWeight='semibold'
                          >
                            {option.name}
                          </Heading>
                        </Stack>

                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-default'
                        >
                          {option.description}
                        </Text>
                      </Stack>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const VaultTransfer = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={TransferIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Transfer Funds
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            You must be a club member to submit an idea and vote on others.
            There is no limit to the number of ideas you can submit and vote on.
          </Text>
        </Stack>
        <HStack spacing={4}>
          <SimpleGrid columns={4} spacing={4} mb='2'>
            {[].map((address) => (
              <Tag
                key={address}
                size='lg'
                borderRadius='full'
                variant='dark'
                onClick={() => console.log('remove member')}
              >
                <TagLabel>{address && shortenAddress(address)}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </SimpleGrid>
        </HStack>
        <Stack spacing='3'>
          <FormControl>
            <FormLabel fontWeight='light' color='gray'>
              Fill out the amount of funds to send from the vault
            </FormLabel>
            <Stack spacing='4'>
              <Grid templateColumns='repeat(7, 1fr)' gap='4'>
                <GridItem colSpan={2}>
                  <HStack justify='space-between' align='center' spacing='2'>
                    <Controller
                      control={control}
                      name='amount'
                      render={({ field: { value } }) => (
                        <InputGroup>
                          <Input
                            id='amount'
                            autoComplete='off'
                            placeholder='100'
                            size='lg'
                            value={value}
                            {...register('amount', {
                              required: false,
                            })}
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
                      )}
                    />
                  </HStack>
                </GridItem>
                <GridItem colSpan={5}>
                  <Controller
                    control={control}
                    name='address'
                    render={({ field: { value } }) => (
                      <InputGroup>
                        <Input
                          id='address'
                          autoComplete='off'
                          placeholder='Recipient address'
                          size='lg'
                          value={value}
                          {...register('address', {
                            required: false,
                          })}
                        />
                      </InputGroup>
                    )}
                  />
                </GridItem>
              </Grid>
              <Button
                size='sm'
                variant='dark'
                position='relative'
                top='1'
                onClick={() => console.log('invalid')}
              >
                Add another recipient
              </Button>
            </Stack>
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const VaultWhitelist = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={VerifyIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Whitelist assets
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            Whitelist new tokens and NFTs, transfer assets, etc.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Controller
              control={control}
              name='vaultType'
              render={({ field: { onChange, value } }) => (
                <RadioCardGroup
                  defaultValue='1'
                  onChange={onChange}
                  value={value}
                  spacing='3'
                  direction='row'
                >
                  {vaultOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
                    >
                      <Stack spacing='1'>
                        <Stack align='baseline'>
                          <Circle bg='dark.500' size='8' mb='3'>
                            <Icon
                              as={option.icon}
                              boxSize={{ base: '4', md: '5' }}
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
                        </Stack>

                        <Text
                          fontSize='md'
                          fontWeight='thin'
                          color='text-default'
                        >
                          Add the ability for your team to buy and sell NFTs via
                          proposal submissions.
                        </Text>
                      </Stack>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const TransferDetails = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={GearIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Proposal Details
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            You must be a club member to submit an idea and vote on others.
            There is no limit to the number of ideas you can submit and vote on.
          </Text>
        </Stack>
        <Stack spacing='3'>
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
                      size='lg'
                      {...register('title', {
                        required: false,
                      })}
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
                      size='lg'
                      rows={3}
                      {...register('description', {
                        required: false,
                      })}
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
                      size='lg'
                      rows={10}
                      {...register('body', {
                        required: false,
                      })}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </Stack>
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const TransferReview = (
    <Stack
      spacing='6'
      px={{ base: '6', md: '8' }}
      py={{ base: '12', md: '16' }}
    >
      <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
        <Icon
          as={GearIcon}
          boxSize={{ base: '6', md: '7' }}
          color='primary.900'
        />
      </Square>
      <Stack>
        <Heading size='lg' fontWeight='black' color='light.900'>
          Review &amp; Deploy
        </Heading>
        <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
          You must be a club member to submit an idea and vote on others. There
          is no limit to the number of ideas you can submit and vote on.
        </Text>
      </Stack>
      {/* <Stack spacing='3'>
        <Stack>
          <Heading size='sm' fontWeight='black' color='light.900'>
            Title
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            {getValues('title')}
          </Text>
        </Stack>
        <Stack>
          <Heading size='sm' fontWeight='black' color='light.900'>
            TL;DR
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            {getValues('description')}
          </Text>
        </Stack>
        <Stack>
          <Heading size='sm' fontWeight='black' color='light.900'>
            Description
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            {getValues('body')}
          </Text>
        </Stack>
      </Stack> */}
      <Stack spacing='3'>
        <Card h='fit-content' bg='dark.800'>
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
                      <Stack spacing='1'>
                        <HStack align='flex-start' spacing='4'>
                          <Stack spacing='1' maxW='lg'>
                            <Heading size='md' fontWeight='black'>
                              1. Deploy proposal contract
                            </Heading>
                            <Text fontSize='sm' fontWeight='light' color='gray'>
                              Deploy your proposal on-chain for submission.
                            </Text>
                          </Stack>
                        </HStack>
                      </Stack>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                      <DeployProposalButton
                        variant='primary'
                        size='md'
                        type='submit'
                        title={getValues('title')}
                        description={getValues('description')}
                        body={getValues('body')}
                        codeBody={codeBody}
                        onDeploy={(contractAdress: string) =>
                          setProposalContractAddress(contractAdress)
                        }
                      />
                    </GridItem>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card>
        <Card h='fit-content' bg='dark.800'>
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
                      <Stack spacing='1'>
                        <HStack align='flex-start' spacing='4'>
                          <Stack spacing='1' maxW='lg'>
                            <Heading size='md' fontWeight='black'>
                              2. Submit proposal
                            </Heading>
                            {proposalContractAddress ? (
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                Submit{' '}
                                {truncateAddress(proposalContractAddress)}{' '}
                                proposal. Your proposal will be open for voting
                                in ~ 2 days.
                              </Text>
                            ) : (
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                Awaiting proposal contract deployment.
                              </Text>
                            )}
                          </Stack>
                        </HStack>
                      </Stack>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                      <Button
                        variant='primary'
                        size='md'
                        type='submit'
                        isDisabled={!proposalContractAddress ?? false}
                      >
                        Submit
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
          size='lg'
          variant='link'
          onClick={() => setStep(currentStep - 1)}
        >
          Back
        </Button>
      </Stack>
    </Stack>
  );

  const NFTMarketplace = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={MarketplaceIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            NFT Marketplace
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            List NFTs for sale, create an auction, or buy one of the NFTs listed
            on the marketplace.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Controller
              control={control}
              name='template'
              render={({ field: { onChange, value } }) => (
                <RadioCardGroup
                  defaultValue='1'
                  onChange={onChange}
                  value={value}
                  spacing='3'
                >
                  {templateOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
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
                          <Text color='light.500' fontSize='sm'>
                            {option.description}
                          </Text>
                        </Stack>
                      </HStack>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  const ProtocolUpgrades = (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log('selected', { data });
        setStep(currentStep + 1);
      })}
    >
      <Stack
        spacing='6'
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
      >
        <Square size='12' bg='dark.500' color='inverted' borderRadius='lg'>
          <Icon
            as={UpgradeIcon}
            boxSize={{ base: '6', md: '7' }}
            color='primary.900'
          />
        </Square>
        <Stack>
          <Heading size='lg' fontWeight='black' color='light.900'>
            Protocol upgrades
          </Heading>
          <Text as='span' cursor='pointer' fontSize='md' fontWeight='light'>
            Make changes to your clubs rules like fundraising duration,
            excecution delays, and more.
          </Text>
        </Stack>
        <Stack spacing='3'>
          <FormControl>
            <Controller
              control={control}
              name='template'
              render={({ field: { onChange, value } }) => (
                <RadioCardGroup
                  defaultValue='1'
                  onChange={onChange}
                  value={value}
                  spacing='3'
                >
                  {templateOptions?.map((option) => (
                    <RadioCard
                      key={option.id}
                      value={option.id}
                      p='5'
                      borderRadius='lg'
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
                          <Text color='light.500' fontSize='sm'>
                            {option.description}
                          </Text>
                        </Stack>
                      </HStack>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack justify='space-between' direction='row'>
          <Button
            size='lg'
            variant='link'
            onClick={() => setStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button size='lg' variant='default' type='submit'>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );

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
        <DrawerOverlay />
        <DrawerContent bg='dark.800'>
          <DrawerCloseButton
            size='lg'
            color='primary.900'
            _focus={{ outline: 'none' }}
          />
          <DrawerBody>
            {currentStep === 0 && SelectTemplate}
            {currentStep === 1 && selectedTemplate === '1' && VaultManagement}
            {currentStep === 1 && selectedTemplate === '2' && NFTMarketplace}
            {currentStep === 1 && selectedTemplate === '3' && ProtocolUpgrades}
            {currentStep === 2 && selectedVaultType === '1' && VaultWhitelist}
            {currentStep === 2 && selectedVaultType === '2' && VaultTransfer}
            {currentStep === 3 && selectedVaultType === '2' && TransferDetails}
            {currentStep === 4 && selectedVaultType === '2' && TransferReview}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
