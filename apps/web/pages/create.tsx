import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Circle,
  Checkbox,
  FormControl,
  FormHelperText,
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
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  SimpleGrid,
  Spinner,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from 'ui';
import { CLUB_TYPES } from 'api/constants';
import { coreDAO } from 'utils/contracts';
import { RadioButtonGroup, RadioButton } from 'ui/components/forms';
import { useForm, Controller, useAccount } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { StacksDeploy, ConnectButton } from 'ui/components/buttons';
import {
  ArrowRight,
  CheckIcon,
  ExtensionOutline,
  InfoIcon,
  LightningBolt,
  PlusIcon,
  VaultOutline,
  WalletIcon,
  XIcon,
} from 'ui/components/icons';
import { shortenAddress, validateStacksAddress } from '@stacks-os/utils';
import { nameToSlug, nameToSymbol } from 'utils';
import { getTransaction } from 'api/clubs';
import { debounce, defaultTo, includes, size } from 'lodash';
import { LaunchLayout } from '../components/layout';
import { useSteps } from 'ui/store';
import { useGlobalState } from 'store';
import { useDAO, useTransaction } from 'ui/hooks';
import { CheckCircle, LogoIcon } from 'ui/components/icons';
import { useCreateClub } from 'api/clubs/mutations';
import { Notification } from '@components/feedback';

export default function Create() {
  const data = useGlobalState((state) => state.club);
  const dao = useDAO(nameToSlug(data?.name));

  const [transactionId, setTransactionId] = React.useState(dao?.data?.tx_id);
  const [isChecked, setIsChecked] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState<
    null | boolean
  >(null);
  const [isDoneTyping, setIsDoneTyping] = React.useState(false);
  const canDeploy = isChecked && data.name && !transactionId;
  const { currentStep, setStep } = useSteps();
  const transaction = useTransaction(transactionId);
  const isReady =
    transaction?.data?.tx_status === 'pending' ||
    transaction?.data?.tx_status === 'success';
  const createClub = useCreateClub();
  const onSuccess = async (transactionId: string, action: any) => {
    const transaction = await getTransaction(transactionId);
    const name = data?.name;
    const slug = nameToSlug(name);
    const type_id = CLUB_TYPES.INVESTMENT_CLUB;
    const txId = transactionId;
    const userAddress = transaction?.sender_address;
    const contractAddress = transaction?.smart_contract?.contract_id;
    const config = {
      memberAddresses: data?.members,
    };

    action.mutate(
      {
        club: {
          name,
          slug,
          type_id,
          tx_id: txId,
          contract_address: contractAddress,
          creator_address: userAddress,
          config,
        },
        userAddress,
      },
      {
        onSuccess: () => {
          setTransactionId(transactionId);
        },
      },
    );
  };
  // TODO: `hasIncompleteClubmake` query to clubs table to check for existing Clubs created by current STX address
  const hasIncompleteClub = !!dao?.data && !dao?.data?.active;
  const name = useGlobalState((state) => state.club.name);
  const updateName = useGlobalState((state) => state.updateName);
  const validateInput = (input: string) => {
    const isAvailable = input !== 'StackerDAO';
    setValidationResult(isAvailable);
    setTimeout(() => {
      setIsDoneTyping(true);
    }, 2500);
  };

  const debouncedValidateInput = debounce(validateInput, 1500);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDoneTyping(false);
    const name = e.target.value;
    updateName(name);
    debouncedValidateInput(name);
  };

  const FinishedState = () => {
    return (
      <Stack spacing='3' align='center' justify='center' h='75vh'>
        <Icon as={CheckCircle} color='primary.900' boxSize='12' />
        <Text
          fontSize='md'
          fontWeight='light'
          color='light.500'
          textAlign='center'
          mt='4'
          maxW='md'
        >
          Complete your Club setup by adding members, configuring your
          governance rules, and more.
        </Text>
        <ButtonGroup as={Flex} spacing='6'>
          <Link href={`/create/${nameToSlug(data?.name)}`}>
            <Button variant='dark' isFullWidth rightIcon={<ArrowRight />}>
              Continue
            </Button>
          </Link>
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Stack
      h='100vh'
      backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
      opacity='1'
    >
      <Stack position='fixed' bottom='0' right='0' left='0'>
        <Alert
          bg='primary-accent.900'
          borderColor='dark.500'
          borderWidth='1px'
          color='light.900'
          variant='subtle'
          justifyContent='center'
        >
          <AlertIcon color='light.900' />
          <AlertDescription>
            As a first step, you will deploy a core contract that is used to
            manage your Club's treasury, voting, and other governance functions.
          </AlertDescription>
        </Alert>
      </Stack>
      <Flex
        justify='space-between'
        align='center'
        bg='dark.800'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        py='1'
        px='16'
        mt='0 !important'
      >
        <Breadcrumb>
          <BreadcrumbItem
            _hover={{
              color: 'light.900',
            }}
          >
            <BreadcrumbLink as={Link} href='/create'>
              <LogoIcon
                my='2'
                alt='logo'
                url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/logo-with-name.png'
                cursor='pointer'
                width='150px'
              />
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ConnectButton
          variant='inverted'
          size='sm'
          _hover={{ opacity: 0.9 }}
          _active={{ opacity: 1 }}
        />
      </Flex>
      <Stack h='80vh' align='center' justify='center' spacing='8'>
        <Grid templateColumns='repeat(7, 1fr)' gap={24} alignItems='center'>
          <GridItem colSpan={3}>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.8, type: 'linear' }}
            >
              <Stack spacing={{ base: '6', md: '6' }}>
                <Stack spacing='2'>
                  <Heading size='3xl' fontWeight='black'>
                    Create Club
                  </Heading>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight='light'
                    color='gray'
                    maxW='sm'
                  >
                    Permissionless DAOs to govern open communities and networks.
                    Perfect for protocol DAOs, NFT communities, ecosystem DAOs,
                    and more.
                  </Text>
                </Stack>
                <Stack spacing='6'>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={WalletIcon} color='primary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        Treasury Management
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={LightningBolt} color='primary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        Proposals & Automatic Execution
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={ExtensionOutline} color='primary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        Composable Extensions
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={VaultOutline} color='primary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        On-chain Voting
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={PlusIcon} color='primary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        ...and more!
                      </Heading>
                    </HStack>
                  </Stack>
                </Stack>
              </Stack>
            </motion.div>
          </GridItem>
          <GridItem colSpan={4}>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.8, type: 'linear' }}
            >
              {isReady ? (
                <FinishedState />
              ) : (
                <Stack spacing='8'>
                  <Stack spacing='3' direction='column'>
                    <Grid templateColumns='repeat(6, 1fr)' gap={8}>
                      <GridItem colSpan={6}>
                        <FormControl id='name'>
                          <FormLabel
                            htmlFor='name'
                            fontWeight='light'
                            color='light.500'
                          >
                            Club Name
                          </FormLabel>
                          <InputGroup>
                            <Input
                              placeholder='Stacks Club'
                              autoComplete='off'
                              size='lg'
                              value={name}
                              onChange={handleNameChange}
                            />
                            <InputRightElement
                              top='1'
                              children={
                                !isDoneTyping ? (
                                  <Spinner color='dark.500' size='xs' />
                                ) : validationResult && name ? (
                                  <CheckIcon color='green.500' />
                                ) : !validationResult && name ? (
                                  <XIcon color='red.500' />
                                ) : null
                              }
                            />
                          </InputGroup>
                          <FormHelperText fontWeight='light' color='gray'>
                            Easily identifyable name for your team.
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={6}>
                        <FormControl id='transferrable'>
                          <FormLabel
                            htmlFor='transferrable'
                            fontWeight='light'
                            color='light.500'
                            maxW='md'
                          >
                            Is this an Investment Club?
                          </FormLabel>
                          <ButtonGroup
                            bg='base.900'
                            borderRadius='lg'
                            p='1'
                            spacing='2'
                          >
                            <Stack align='center' direction='row' spacing='3'>
                              <RadioGroup
                                defaultValue='yes'
                                onChange={() => {}}
                                value='yes'
                              >
                                <Stack direction='row'>
                                  <Radio size='md' value='yes'>
                                    Yes
                                  </Radio>
                                  <Radio size='md' value='no'>
                                    No
                                  </Radio>
                                </Stack>
                              </RadioGroup>
                            </Stack>
                          </ButtonGroup>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Stack>
                  <Stack spacing='6'>
                    <StacksDeploy
                      variant='default'
                      buttonName='Continue'
                      template={coreDAO()}
                      onSuccess={(transaction) =>
                        onSuccess(transaction?.txId, createClub)
                      }
                      isDisabled={!canDeploy}
                    />
                    <Stack direction='row' justify='center'>
                      <Checkbox
                        size='sm'
                        colorScheme='primary'
                        onChange={(e) => setIsChecked(e.currentTarget.checked)}
                      >
                        <Text as='span' textAlign='center'>
                          I agree to the terms and conditions
                        </Text>
                      </Checkbox>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </motion.div>
          </GridItem>
        </Grid>
      </Stack>
      {hasIncompleteClub && (
        <Notification path={`/create/${nameToSlug(data?.name)}`} />
      )}
    </Stack>
  );
}

Create.getLayout = (page: any) => <LaunchLayout>{page}</LaunchLayout>;
