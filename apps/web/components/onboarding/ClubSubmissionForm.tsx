import React from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
  Box,
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
  Stack,
  Tag,
  Text,
} from 'ui';
import { Card } from 'ui/components/cards';
import { RadioButton, RadioButtonGroup } from 'ui/components/forms';
import { StacksSDK } from 'sdk';
import { getTransaction } from 'api/clubs';
import { useUpdateBootstrap, useUpdateInitTxId } from 'api/clubs/mutations';
import { useDAO, useTransaction } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { useSubmissionStore } from 'store';
import { findExtension, estimateDays, getPercentage } from 'utils';
import { filter, size } from 'lodash';
import { ArrowRight, InfoIcon } from 'ui/components/icons';

const NameForm = () => {
  const submission = useSubmissionStore((state) => state.submission);

  const handleMinStartBlock = useSubmissionStore(
    (state) => state.updateMinimumStartDelay,
  );

  const handleMaxStartBlock = useSubmissionStore(
    (state) => state.updateMaximumStartDelay,
  );

  return (
    <Grid templateColumns='repeat(6, 1fr)' gap='8'>
      <GridItem colSpan={3}>
        <Stack spacing='6' direction='column'>
          <Stack spacing='3' direction='column'>
            <FormControl id='min-block'>
              <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
                Minimum Start Block{' '}
              </FormLabel>
              <Stack spacing='3'>
                <Input
                  placeholder='0'
                  autoComplete='off'
                  size='lg'
                  onChange={(e: any) => handleMinStartBlock(e.target.value)}
                  value={submission.minimumProposalStartDelay}
                />
                <FormHelperText fontWeight='light' color='gray'>
                  This requires all proposals to wait ~{' '}
                  {estimateDays(Number(submission.minimumProposalStartDelay))}{' '}
                  days before voting begins.
                </FormHelperText>
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem colSpan={3}>
        <Stack spacing='6' direction='column'>
          <Stack spacing='3' direction='column'>
            <FormControl id='max-block'>
              <FormLabel htmlFor='name' fontWeight='light' color='light.500'>
                Maximum Start Block{' '}
              </FormLabel>
              <Stack spacing='3'>
                <Input
                  placeholder='0'
                  autoComplete='off'
                  size='lg'
                  onChange={(e: any) => handleMaxStartBlock(e.target.value)}
                  value={submission.maximumProposalStartDelay}
                />
                <FormHelperText fontWeight='light' color='gray'>
                  This requires all proposals must go live for a vote within ~{' '}
                  {estimateDays(Number(submission.maximumProposalStartDelay))}{' '}
                  days.
                </FormHelperText>
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

const FinishedState = () => {
  const dao = useDAO();
  const updateBootstrap = useUpdateBootstrap();
  const transaction = useTransaction(dao?.data?.bootstrap_tx_id);
  const updateInitTxId = useUpdateInitTxId();
  const activationTransaction = useTransaction(dao?.data?.activation_tx_id);
  const nftMembershipPassExtension = findExtension(
    dao?.data?.extensions,
    'NFT Membership',
  );
  const vaultExtension = findExtension(dao?.data?.extensions, 'Vault');
  const sdk = new StacksSDK(dao?.data?.contract_address);

  const onSuccess = async (payload: any) => {
    const { txId } = payload;
    try {
      const tx = await getTransaction(txId);
      const contractAddress = tx?.smart_contract?.contract_id;
      updateBootstrap.mutate({
        contract_address: dao?.data?.contract_address,
        bootstrap_address: contractAddress,
        bootstrap_tx_id: txId,
      });
    } catch (e: any) {
      console.error({ e });
    }
  };

  const onActivationSuccess = async (payload: any) => {
    const { txId } = payload;
    try {
      updateInitTxId.mutate({
        contract_address: dao?.data?.contract_address,
        activation_tx_id: txId,
      });
    } catch (e: any) {
      console.error({ e });
    }
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
              colorScheme='primary'
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
                            variant='primary'
                            onClick={() =>
                              sdk.deployer.deployBootstrap({
                                contractName: 'lfg',
                                extensions: {
                                  vaultContract: findExtension(
                                    dao?.data?.extensions,
                                    'Vault',
                                  )?.contract_address,
                                  nftMembershipContract: findExtension(
                                    dao?.data?.extensions,
                                    'NFT Membership',
                                  )?.contract_address,
                                  governanceTokenContract: findExtension(
                                    dao?.data?.extensions,
                                    'Governance Token',
                                  )?.contract_address,
                                  investmentClubContract: findExtension(
                                    dao?.data?.extensions,
                                    'Investment Club',
                                  )?.contract_address,
                                  votingContract: findExtension(
                                    dao?.data?.extensions,
                                    'Voting',
                                  )?.contract_address,
                                  submissionContract: findExtension(
                                    dao?.data?.extensions,
                                    'Submission',
                                  )?.contract_address,
                                },
                                members:
                                  nftMembershipPassExtension?.data?.config
                                    ?.members,
                                allowlist:
                                  vaultExtension?.data?.config?.allowed_tokens,
                                onFinish: onSuccess,
                              })
                            }
                            isDisabled={size(dao?.data?.extensions) < 1}
                          >
                            Deploy
                          </Button>
                        )}
                        {transaction?.data?.tx_status === 'pending' && (
                          <Button variant='dark' isLoading />
                        )}
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
                            variant='primary'
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
                        {activationTransaction?.data?.tx_status ===
                          'pending' && <Button variant='dark' isLoading />}
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
              <Icon as={InfoIcon} color='primary.900' fontSize='lg' />
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

export const ClubSubmissionForm = (props: any) => {
  const { dao } = props;
  const extension = findExtension(dao?.extensions, 'Submission');
  const transaction = useTransaction(extension?.tx_id);
  const submissionStore = useSubmissionStore((state) => state.submission);
  const handleSelectProposalDuration = useSubmissionStore(
    (state) => state.updateProposalDuration,
  );

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
                          Submission Details
                        </Text>
                        <Text color='light.500' fontSize='sm' maxW='md'>
                          Select the submission parameters for your Club.
                        </Text>
                      </Box>
                      <Grid templateColumns='repeat(5, 1fr)' gap='8'>
                        <GridItem colSpan={5}>
                          <FormControl>
                            <FormLabel
                              htmlFor='durationInDays'
                              fontWeight='light'
                              color='gray'
                            >
                              Proposal duration
                            </FormLabel>
                            <RadioButtonGroup
                              defaultValue='1'
                              size='lg'
                              onChange={(value: any) => {
                                handleSelectProposalDuration(value);
                              }}
                              value={submissionStore.proposalDuration}
                            >
                              <RadioButton value='144'>1 day</RadioButton>
                              <RadioButton value='288'>2 days</RadioButton>
                              <RadioButton value='432'>3 days</RadioButton>
                              <RadioButton value='1008'>1 week</RadioButton>
                            </RadioButtonGroup>
                            <FormHelperText fontWeight='light' color='gray'>
                              This can be changed later via a proposal passed by
                              the Club members.
                            </FormHelperText>
                          </FormControl>
                        </GridItem>
                      </Grid>
                      <NameForm />
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
