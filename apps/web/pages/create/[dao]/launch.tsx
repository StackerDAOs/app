import React from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Progress,
  Stack,
  Tag,
  Text,
} from 'ui';
import { StacksSDK } from 'sdk';
import { getTransaction } from 'api/clubs';
import { useUpdateBootstrap, useUpdateInitTxId } from 'api/clubs/mutations';
import { Card } from 'ui/components/cards';
import { ConnectButton } from 'ui/components/buttons';
import { useDAO, useExtension, useTransaction } from 'ui/hooks';
import { ArrowRight, ChevronRight, InfoIcon } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { findExtension, getPercentage } from 'utils';
import { filter, size } from 'lodash';

export default function Create() {
  const dao = useDAO();
  const updateBootstrap = useUpdateBootstrap();
  const transaction = useTransaction(dao?.data?.bootstrap_tx_id);
  const updateInitTxId = useUpdateInitTxId();
  const activationTransaction = useTransaction(dao?.data?.activation_tx_id);
  const membershipPassExtension = useExtension('NFT Membership');
  const vaultExtension = useExtension('Vault');
  const sdk = new StacksSDK(dao?.data?.contract_address);
  const onSuccess = async (payload: any) => {
    const txId = payload.txId;
    const transaction = await getTransaction(txId);
    const contractAddress = transaction?.smart_contract?.contract_id;
    try {
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
    const txId = payload.txId;
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

  console.log({ dao, currentProgress });

  return (
    <Stack spacing='10'>
      <Flex
        justify='space-between'
        align='center'
        bg='dark.800'
        borderBottomWidth='1px'
        borderBottomColor='dark.500'
        py='4'
        px='16'
      >
        <Breadcrumb spacing='2' separator={<ChevronRight fontSize='sm' />}>
          <BreadcrumbItem
            color='gray'
            _hover={{
              color: 'light.900',
            }}
          >
            <BreadcrumbLink
              as={Link}
              href={`/create/${dao?.data?.slug}`}
              _hover={{
                textDecoration: 'none',
              }}
            >
              {dao?.data?.name || 'Club'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href='#'
              _hover={{
                textDecoration: 'none',
              }}
            >
              Launch
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
      <Stack as={Flex} justify='center' align='center' h='75vh' bg='dark.900'>
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
                            {size(dao?.data?.extensions) < 6 && (
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
                                  This is the smart contract code that enables
                                  all the extensions you deployed, mint your
                                  Club passes to members, and more.
                                </Text>
                              </Stack>
                            </HStack>
                          </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, md: 1 }}>
                          {transaction?.data?.tx_status === 'pending' ? (
                            <Button variant='dark' isLoading />
                          ) : transaction?.data?.tx_status === 'success' ? (
                            <Button variant='dark'>Complete</Button>
                          ) : (
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
                                    membershipPassExtension?.data?.config
                                      ?.members,
                                  allowlist:
                                    vaultExtension?.data?.config
                                      ?.allowed_tokens,
                                  onFinish: onSuccess,
                                })
                              }
                              isDisabled={size(dao?.data?.extensions) < 6}
                            >
                              Deploy
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
                                  Make a contract call to the `init` function
                                  from the previously deployed initialization
                                  contract that will execute the code and
                                  activate your Club.
                                </Text>
                              </Stack>
                            </HStack>
                          </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, md: 1 }}>
                          {activationTransaction?.data?.tx_status ===
                          'pending' ? (
                            <Button variant='dark' isLoading />
                          ) : activationTransaction?.data?.tx_status ===
                            'success' ? (
                            <Button variant='dark'>Complete</Button>
                          ) : (
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
                        </GridItem>
                      </Grid>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
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
        </Stack>
      </Stack>
    </Stack>
  );
}
