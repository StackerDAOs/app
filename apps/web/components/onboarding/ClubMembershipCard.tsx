import React from 'react';
import Link from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from 'ui';
import { StacksSDK } from 'sdk';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { defaultTo } from 'lodash';
import { useTransaction } from 'ui/hooks';
import { getTransaction } from 'api/clubs';
import { useClubMembershipPass } from 'store';
import { findExtension, getExplorerLink } from 'utils';
import { CLUB_EXTENSION_TYPES } from 'api/constants';
import { useCreateExtension } from 'api/clubs/mutations/extensions';

export const ClubMembershipCard = (props: any) => {
  const { isLoading, dao } = props;
  const sdk = new StacksSDK(dao?.contract_address);
  const data = useClubMembershipPass((state) => state.membershipPass);
  const extension = findExtension(dao?.extensions, 'NFT Membership');
  const transaction = useTransaction(extension?.tx_id);
  const formIsValidated = data.name?.length > 4 && data.symbol?.length >= 3;
  const alreadyDeployed = dao?.extensions.length > 0;
  const createExtension = useCreateExtension();
  const onSuccess = async (payload: any) => {
    const txId = payload.txId;
    const transaction = await getTransaction(txId);
    const name = data?.name;
    const userAddress = transaction?.sender_address;
    const contractAddress = transaction?.smart_contract?.contract_id;
    createExtension.mutate({
      club_id: dao?.id,
      contract_address: contractAddress,
      extension_type_id: CLUB_EXTENSION_TYPES.NFT_MEMBERSHIP,
      tx_id: txId,
    });
  };
  console.log({ dao, transaction, extension });
  return (
    <GridItem colSpan={{ base: 5, md: 3, lg: 2 }}>
      <Stack
        as={Flex}
        direction='row'
        w='85%'
        p={{ base: '12', md: '12' }}
        bg='dark.800'
        borderWidth='1px'
        borderColor='dark.500'
        borderRadius='xl'
        h='full'
        backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)'
        opacity='1'
      >
        <Stack spacing={{ base: '8', md: '12' }} justify='space-between'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 0.8, type: 'linear' }}
          >
            <Stack spacing='8'>
              <Stack spacing='4'>
                <Badge
                  color='primary.900'
                  bg='dark.500'
                  alignSelf='start'
                  size='lg'
                  py='1'
                  px='3'
                  borderRadius='3xl'
                >
                  <Text as='span' fontWeight='regular'>
                    Governance
                  </Text>
                </Badge>
                <Stack
                  spacing={{ base: '4', md: '6' }}
                  maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                >
                  <Stack spacing='3'>
                    <Heading size='2xl' fontWeight='thin'>
                      Club Pass
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      fontWeight='light'
                      color='gray'
                    >
                      Club Passes are non-transferable NFTs and define your
                      Club&apos;s membership. They are required to deposit into
                      the Club.
                    </Text>
                  </Stack>
                  <Stack spacing={{ base: '8', md: '10' }}>
                    <Stack spacing={{ base: '2', md: '4' }}>
                      <Stack spacing='8'>
                        <Stack py={{ base: '3', md: '3' }} spacing='2'>
                          <Stack
                            pt='1'
                            px='1'
                            align='center'
                            direction='row'
                            justify='space-between'
                            borderTopWidth='1px'
                            borderColor='dark.500'
                          >
                            <Text fontSize='lg' fontWeight='thin' color='gray'>
                              Name
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {defaultTo(
                                data.name === '' ? undefined : data.name,
                                '---',
                              )}
                            </Text>
                          </Stack>
                          <Stack
                            pt='1'
                            px='1'
                            align='center'
                            direction='row'
                            justify='space-between'
                            borderTopWidth='1px'
                            borderColor='dark.500'
                          >
                            <Text fontSize='lg' fontWeight='thin' color='gray'>
                              Symbol
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {defaultTo(
                                data.symbol === '' ? undefined : data.symbol,
                                '---',
                              )}
                            </Text>
                          </Stack>
                          <Stack
                            pt='1'
                            px='1'
                            align='center'
                            direction='row'
                            justify='space-between'
                            borderTopWidth='1px'
                            borderColor='dark.500'
                          >
                            <Text fontSize='lg' fontWeight='thin' color='gray'>
                              Max supply
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {defaultTo(
                                data.maxSupply === '' ? '99' : data.maxSupply,
                                '---',
                              )}
                            </Text>
                          </Stack>
                          <Stack
                            pt='1'
                            px='1'
                            align='center'
                            direction='row'
                            justify='space-between'
                            borderTopWidth='1px'
                            borderColor='dark.500'
                          >
                            <Text fontSize='lg' fontWeight='thin' color='gray'>
                              Non-transferrable
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {data.isTransferrable === 'yes' ? 'Yes' : 'No'}
                            </Text>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </motion.div>
          <Stack spacing='6'>
            {transaction?.data?.tx_status === 'pending' ||
            transaction?.data?.tx_status === 'success' ? (
              <Stack align='center'>
                <Link href={getExplorerLink(transaction?.data?.tx_id)}>
                  <Button variant='dark' isFullWidth>
                    View transaction
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Button
                variant={!extension ? 'primary' : 'outline'}
                isDisabled={isLoading || !!extension || !formIsValidated}
                onClick={() =>
                  sdk.deployer.deployMembershipPass({
                    contractName: 'random-ass-v2',
                    tokenName: data.name,
                    onFinish: onSuccess,
                  })
                }
              >
                Deploy
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </GridItem>
  );
};
