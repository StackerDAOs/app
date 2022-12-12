import React from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
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
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Spinner,
  Text,
} from 'ui';
import { coreDAO } from 'utils/contracts';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { StacksDeploy, ConnectButton } from 'ui/components/buttons';
import {
  ArrowRight,
  CheckIcon,
  CheckCircle,
  LogoIcon,
  LightningBolt,
  PlusIcon,
  VaultOutline,
  WalletIcon,
  XIcon,
} from 'ui/components/icons';
import { nameToSlug } from 'utils';
import { getTransaction } from 'api/teams';
import { debounce } from 'lodash';
import { useGlobalState } from 'store';
import { useTeam, useTransaction } from 'ui/hooks';
import { useCreateTeam } from 'api/teams/mutations';
import { Notification } from '@components/feedback';
import { LaunchLayout } from '../components/layout';

const FinishedState = ({ name }: any) => (
  <Stack spacing='3' align='center' justify='center' h='75vh'>
    <Icon as={CheckCircle} color='secondary.900' boxSize='12' />
    <Text
      fontSize='md'
      fontWeight='light'
      color='light.500'
      textAlign='center'
      mt='4'
      maxW='md'
    >
      Complete your Team setup by adding members and adding a treasury.
    </Text>
    <ButtonGroup as={Flex} spacing='6'>
      <Link href={`/create/${nameToSlug(name)}/extensions`}>
        <Button variant='dark' isFullWidth rightIcon={<ArrowRight />}>
          Continue
        </Button>
      </Link>
    </ButtonGroup>
  </Stack>
);

export default function Create() {
  const data = useGlobalState((state) => state.club);
  const dao = useTeam(nameToSlug(data?.name));
  const [transactionId, setTransactionId] = React.useState(dao?.data?.tx_id);
  const [isChecked, setIsChecked] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState<
    null | boolean
  >(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const canDeploy = isChecked && data.name && !transactionId;
  const transaction = useTransaction(transactionId);
  const isReady =
    transaction?.data?.tx_status === 'pending' ||
    transaction?.data?.tx_status === 'success';
  const createTeam = useCreateTeam();
  const onSuccess = (txId: string, action: any) => {
    try {
      setTimeout(async () => {
        const tx = await getTransaction(txId);
        const slug = nameToSlug(data?.name);
        const userAddress = tx?.sender_address;
        const contractAddress = tx?.smart_contract?.contract_id;
        if (!userAddress || !contractAddress) {
          throw new Error('No user address or contract address');
        } else {
          const team = {
            name: data?.name,
            slug,
            tx_id: txId,
            contract_address: contractAddress,
            creator_address: userAddress,
          };
          await action.mutate(
            {
              team,
              userAddress,
            },
            {
              onSuccess: () => {
                setTransactionId(txId);
              },
            },
          );
        }
      }, 2500);
    } catch (error) {
      console.log('onSuccess | Teams', { error });
    }
  };
  const hasIncompleteClub = !!dao?.data && !dao?.data?.active;
  const name = useGlobalState((state) => state.club.name);
  const updateName = useGlobalState((state) => state.updateName);
  const validateInput = (input: string) => {
    const isAvailable = input !== 'StackerDAO';
    setValidationResult(isAvailable);
    setTimeout(() => {
      setIsTyping(false);
    }, 2500);
  };

  const debouncedValidateInput = debounce(validateInput, 1500);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsTyping(true);
    updateName(value);
    debouncedValidateInput(value);
  };

  return (
    <Stack
      h='100vh'
      backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
      opacity='1'
    >
      <Stack position='fixed' bottom='0' right='0' left='0'>
        <Alert
          bg='secondary.900'
          borderColor='dark.500'
          borderWidth='1px'
          color='light.900'
          variant='subtle'
          justifyContent='center'
        >
          <AlertIcon color='light.900' />
          <AlertDescription>
            As a first step, you will deploy a core contract that is used to
            manage your Team&apos;s treasury.
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
          variant='secondary-inverted'
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
                    Create Team
                  </Heading>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight='light'
                    color='gray'
                    maxW='sm'
                  >
                    Multisig tool for working groups to manage assets and smart
                    contracts. Perfect for companies, projects, subDAOs, and
                    early DAOs progressively decentralizing.
                  </Text>
                </Stack>
                <Stack spacing='6'>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={WalletIcon} color='secondary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        Treasury Management
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={LightningBolt} color='secondary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        Proposals & Automatic Execution
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={VaultOutline} color='secondary.900' />
                      <Heading size='sm' fontWeight='medium'>
                        On-chain Voting
                      </Heading>
                    </HStack>
                  </Stack>
                  <Stack spacing='1'>
                    <HStack spacing='2' align='center'>
                      <Icon as={PlusIcon} color='secondary.900' />
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
                <FinishedState name={data?.name} />
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
                            Team Name
                          </FormLabel>
                          <InputGroup>
                            <Input
                              placeholder='Stacks Team'
                              autoComplete='off'
                              size='lg'
                              value={name}
                              onChange={handleNameChange}
                            />
                            <InputRightElement top='1'>
                              {isTyping && (
                                <Spinner color='dark.500' size='xs' />
                              )}
                              {!isTyping && validationResult && name && (
                                <CheckIcon color='green.500' />
                              )}
                              {!isTyping && !validationResult && name && (
                                <XIcon color='red.500' />
                              )}
                            </InputRightElement>
                          </InputGroup>
                          <FormHelperText fontWeight='light' color='gray'>
                            An easily identifyable name for your team.
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Stack>
                  <Stack spacing='6'>
                    <StacksDeploy
                      name={data?.name}
                      variant='default'
                      buttonName='Continue'
                      template={coreDAO()}
                      onSuccess={(coreTx) =>
                        onSuccess(coreTx?.txId, createTeam)
                      }
                      isDisabled={!canDeploy}
                    />
                    <Stack direction='row' justify='center'>
                      <Checkbox
                        size='sm'
                        colorScheme='secondary'
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
