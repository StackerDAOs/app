import React from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
  Box,
  ButtonGroup,
  Button,
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
  Progress,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from 'ui';
import { Card } from 'ui/components/cards';
import { StacksSDK } from 'sdk';
import Papa from 'papaparse';
import { getTransaction } from 'api/teams';
import { useUpdateBootstrap, useUpdateInitTxId } from 'api/teams/mutations';
import { useGenerateName, useTeam, useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { shortenAddress, validateContractAddress } from '@stacks-os/utils';
import { useVaultStore } from 'store';
import { findExtension, getPercentage } from 'utils';
import { filter, size } from 'lodash';
import {
  ArrowRight,
  CheckIcon,
  InfoIcon,
  UploadIcon,
} from 'ui/components/icons';

const AllowlistSelectForm = () => {
  const vault = useVaultStore((state) => state.vault);
  const handleSelect = useVaultStore((state) => state.handleSelectAllowList);
  return (
    <FormControl id='transferrable'>
      <FormLabel
        htmlFor='transferrable'
        fontWeight='light'
        color='light.500'
        maxW='md'
      >
        Do you want to require all assets stored in the vault to be whitelisted?
      </FormLabel>
      <ButtonGroup bg='base.900' borderRadius='lg' p='1' spacing='2'>
        <Stack align='center' direction='row' spacing='3'>
          <RadioGroup
            defaultValue='yes'
            onChange={handleSelect}
            value={vault.hasAllowList}
          >
            <Stack direction='row'>
              <Radio variant='secondary' size='md' value='yes'>
                Yes
              </Radio>
              <Radio variant='secondary' size='md' value='no' isDisabled>
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      </ButtonGroup>
    </FormControl>
  );
};

const AddTokenForm = () => {
  const inputRef = React.useRef<any>(null);
  const vault = useVaultStore((state) => state.vault);
  const addAllowedToken = useVaultStore((state) => state.addAllowedToken);
  const removeAllowedToken = useVaultStore((state) => state.removeAllowedToken);
  const [filename, setFilename] = React.useState('');

  const handleFilePickerClick = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFilename(file.name);
    Papa.parse(file, {
      complete: (results: any) => {
        const validAddresses = results.data
          .flat()
          .filter((address: string) => validateContractAddress(address));
        validAddresses.forEach((member: any) => {
          addAllowedToken(member);
        });
      },
    });
  };
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      <GridItem colSpan={4}>
        <FormControl id='asset'>
          <HStack spacing='1' align='baseline' justify='space-between'>
            <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
              Allowlist
            </FormLabel>
            <Button
              variant='link'
              color='gray'
              size='sm'
              leftIcon={<UploadIcon />}
              onClick={handleFilePickerClick}
            >
              <Text as='span' fontSize='sm' fontWeight='light'>
                Upload file
              </Text>
              <input
                type='file'
                ref={inputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </Button>
          </HStack>
          <Stack spacing='3'>
            <Input
              placeholder='Asset Contract Address'
              autoComplete='off'
              size='lg'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAllowedToken(e.currentTarget.value);
                }
              }}
            />
            <FormHelperText fontWeight='light' color='gray'>
              {filename && (
                <HStack spacing='1' align='center'>
                  <Icon as={CheckIcon} fontSize='sm' />
                  <Text as='span' fontSize='sm'>
                    {filename}
                  </Text>
                </HStack>
              )}{' '}
            </FormHelperText>
            <HStack spacing={4}>
              <SimpleGrid columns={3} spacing={4}>
                {vault.listOfAllowedTokens.map((asset: string) => (
                  <Tag key={asset} size='sm' borderRadius='full' variant='dark'>
                    <TagLabel>{asset && shortenAddress(asset)}</TagLabel>
                    <TagCloseButton onClick={() => removeAllowedToken(asset)} />
                  </Tag>
                ))}
              </SimpleGrid>
            </HStack>
          </Stack>
        </FormControl>
      </GridItem>
    </Grid>
  );
};

const FinishedState = () => {
  const [isRequestPending, setIsRequestPending] = React.useState(false);
  const [isRequestPendingForActivation, setIsRequestPendingForActivation] =
    React.useState(false);
  const dao = useTeam();
  const updateBootstrap = useUpdateBootstrap();
  const transaction = useTransaction(dao?.data?.bootstrap_tx_id);
  const updateInitTxId = useUpdateInitTxId();
  const activationTransaction = useTransaction(dao?.data?.activation_tx_id);
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const sdk = new StacksSDK(dao?.data?.contract_address);
  const { randomName: contractName } = useGenerateName();

  const onSuccess = (payload: any) => {
    setIsRequestPending(true);
    setTimeout(async () => {
      const { txId } = payload;
      try {
        const tx = await getTransaction(txId);
        const contractAddress = tx?.smart_contract?.contract_id;
        if (!contractAddress) {
          throw new Error('Bootstrap contract address not found');
        } else {
          updateBootstrap.mutate({
            contract_address: dao?.data?.contract_address,
            bootstrap_address: contractAddress,
            bootstrap_tx_id: txId,
          });
        }
      } catch (e: any) {
        console.error({ e });
      } finally {
        setIsRequestPending(false);
      }
    }, 1000);
  };

  const onActivationSuccess = async (payload: any) => {
    setIsRequestPendingForActivation(true);
    setTimeout(async () => {
      const { txId } = payload;
      try {
        const tx = await getTransaction(txId);
        if (!tx) {
          throw new Error('Activation transaction not found');
        } else {
          updateInitTxId.mutate({
            contract_address: dao?.data?.contract_address,
            activation_tx_id: txId,
          });
        }
      } catch (e: any) {
        console.error({ e });
      } finally {
        setIsRequestPendingForActivation(false);
      }
    }, 1000);
  };

  const currentProgress = size(
    filter(
      [
        transaction?.data?.tx_status === 'success',
        activationTransaction?.data?.tx_status === 'success',
      ],
      (result) => !!result,
    ),
  );

  return (
    <Stack spacing='3' align='center' justify='center' h='75vh'>
      <Stack spacing='8' px='16'>
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.8, type: 'linear' }}
        >
          <Stack spacing={{ base: '6', md: '6' }}>
            <Progress
              colorScheme='secondary'
              borderRadius='lg'
              size='md'
              value={getPercentage(2, currentProgress)}
              bg='dark.500'
            />
          </Stack>
        </motion.div>
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
                          {size(dao?.data?.extensions) < 1 && (
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
                                Deploy Initialization Contract
                              </Heading>
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                This is the smart contract code that enables all
                                the extensions you deployed, mint your Club
                                passes to members, and more.
                              </Text>
                            </Stack>
                          </HStack>
                        </Stack>
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 1 }}>
                        {!transaction?.data && (
                          <Button
                            variant='secondary'
                            onClick={() =>
                              sdk.deployer.deployTeamBootstrap({
                                contractName,
                                extensions: {
                                  vaultContract: findExtension(
                                    dao?.data?.extensions,
                                    'Vault',
                                  )?.contract_address,
                                  multisigContract: findExtension(
                                    dao?.data?.extensions,
                                    'Team',
                                  )?.contract_address,
                                },
                                signalsRequired: Number(
                                  multisigExtension?.config?.signalsRequired,
                                ),
                                members: multisigExtension?.config?.members,
                                allowlist:
                                  vaultExtension?.config?.allowed_tokens,
                                onFinish: onSuccess,
                              })
                            }
                            isDisabled={size(dao?.data?.extensions) < 1}
                          >
                            Deploy
                          </Button>
                        )}
                        {isRequestPending ||
                          (transaction?.data?.tx_status === 'pending' && (
                            <Button variant='dark' isLoading />
                          ))}
                        {transaction?.data?.tx_status === 'success' && (
                          <Button variant='dark' isDisabled>
                            Completed
                          </Button>
                        )}
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
                      justifyItems='flex-end'
                    >
                      <GridItem colSpan={{ base: 2, md: 4 }}>
                        <Stack spacing='2'>
                          {transaction?.data?.tx_status !== 'success' && (
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
                          )}
                          <HStack align='flex-start' spacing='4'>
                            <Stack spacing='1' maxW='lg'>
                              <Heading size='md' fontWeight='black'>
                                Activate Club
                              </Heading>
                              <Text
                                fontSize='sm'
                                fontWeight='light'
                                color='gray'
                              >
                                Make a contract call to the `init` function from
                                the previously deployed initialization contract
                                that will execute the code and activate your
                                Club.
                              </Text>
                            </Stack>
                          </HStack>
                        </Stack>
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 1 }}>
                        {!activationTransaction?.data && (
                          <Button
                            variant='secondary'
                            onClick={() =>
                              sdk.init({
                                proposalAddress: dao?.data?.bootstrap_address,
                                onFinish: onActivationSuccess,
                              })
                            }
                            isDisabled={
                              transaction?.data?.tx_status !== 'success'
                            }
                          >
                            Activate
                          </Button>
                        )}
                        {isRequestPendingForActivation ||
                          (activationTransaction?.data?.tx_status ===
                            'pending' && <Button variant='dark' isLoading />)}
                        {activationTransaction?.data?.tx_status ===
                          'success' && (
                          <Button variant='dark' isDisabled>
                            Completed
                          </Button>
                        )}
                      </GridItem>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
        {transaction?.data?.tx_status === 'success' &&
        activationTransaction?.data?.tx_status === 'success' ? (
          <Link href={`/${dao?.data?.slug}`}>
            <Button variant='link' rightIcon={<ArrowRight />}>
              Go to Dashboard
            </Button>
          </Link>
        ) : (
          <Alert
            bg='dark.800'
            borderColor='dark.500'
            borderWidth='1px'
            color='light.900'
            status='info'
            borderRadius='lg'
            textAlign='center'
            justifyContent='center'
            m='0 auto'
          >
            <HStack spacing='2'>
              <Icon as={InfoIcon} color='secondary.900' fontSize='lg' />
              <AlertDescription>
                The following steps must be compeleted in the order they are
                presented.
              </AlertDescription>
            </HStack>
          </Alert>
        )}
      </Stack>
    </Stack>
  );
};

export const TeamVaultForm = (props: any) => {
  const { dao } = props;
  const extension = findExtension(dao?.extensions, 'Vault');
  const transaction = useTransaction(extension?.tx_id);
  const hasAllowList = useVaultStore((state) => state.vault.hasAllowList);

  return (
    <Stack spacing='2'>
      <GridItem colSpan={3}>
        {transaction?.data?.tx_status === 'pending' ||
        transaction?.data?.tx_status === 'success' ? (
          <FinishedState />
        ) : (
          <Stack
            as={Flex}
            direction='row'
            pr={{ base: '8', md: '12' }}
            h='full'
          >
            <Box
              as='form'
              py='12'
              bg='dark.900'
              w='100%'
              overflowY='scroll'
              overflowX='hidden'
              scrollBehavior='smooth'
              h='75vh'
              css={{
                '&::-webkit-scrollbar': {
                  width: '0',
                },
              }}
            >
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.8, type: 'linear' }}
              >
                <Stack spacing='12'>
                  <Stack spacing='12'>
                    <Stack spacing='6' direction='column'>
                      <Box>
                        <Text fontSize='lg' fontWeight='medium'>
                          Vault Configuration
                        </Text>
                      </Box>
                      <AllowlistSelectForm />
                      {hasAllowList === 'yes' ? (
                        <motion.div
                          key={1}
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.8, type: 'linear' }}
                        >
                          <Stack spacing='6' direction='column'>
                            <Box>
                              <Text fontSize='lg' fontWeight='medium'>
                                Assets
                              </Text>
                              <Text color='light.500' fontSize='sm' maxW='md'>
                                Add NFT and Token contract addresses to the
                                allowlist.
                              </Text>
                            </Box>
                            <AddTokenForm />
                          </Stack>
                        </motion.div>
                      ) : null}
                    </Stack>
                  </Stack>
                </Stack>
              </motion.div>
            </Box>
          </Stack>
        )}
      </GridItem>
    </Stack>
  );
};
