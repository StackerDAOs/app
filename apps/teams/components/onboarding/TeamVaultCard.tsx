import React from 'react';
import Link from 'next/link';
import { Badge, Button, Flex, GridItem, Heading, Stack, Text } from 'ui';
import { StacksSDK } from 'sdk';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { defaultTo } from 'lodash';
import { useGenerateName, useTransaction } from 'ui/hooks';
import { getTransaction } from 'api/teams';
import { useVaultStore } from 'store';
import { findExtension, getExplorerLink } from 'utils';
import { TEAM_EXTENSION_TYPES } from 'api/constants';
import { useCreateExtension } from 'api/teams/mutations/extensions';

export const TeamVaultCard = (props: any) => {
  const { isLoading, dao } = props;
  const sdk = new StacksSDK(dao?.contract_address);
  const data = useVaultStore((state) => state.vault);
  const extension = findExtension(dao?.extensions, 'Vault');
  const transaction = useTransaction(extension?.tx_id);
  const createExtension = useCreateExtension();
  const { randomName: contractName } = useGenerateName();
  const onSuccess = async (payload: any) => {
    const { txId } = payload;
    const tx = await getTransaction(txId);
    const contractAddress = tx?.smart_contract?.contract_id;
    createExtension.mutate({
      team_id: dao?.id,
      contract_address: contractAddress,
      extension_type_id: TEAM_EXTENSION_TYPES.VAULT,
      tx_id: txId,
      config: {
        allowed_tokens: data.listOfAllowedTokens,
      },
    });
  };
  return (
    <GridItem colSpan={{ base: 5, md: 3, lg: 2 }}>
      <Stack
        as={Flex}
        direction='row'
        w='80%'
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
                  color='secondary.900'
                  bg='dark.500'
                  alignSelf='start'
                  size='lg'
                  py='1'
                  px='3'
                  borderRadius='3xl'
                >
                  <Text as='span' fontWeight='regular'>
                    Asset Management
                  </Text>
                </Badge>
                <Stack
                  spacing={{ base: '4', md: '6' }}
                  maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                >
                  <Stack spacing='3'>
                    <Heading size='2xl' fontWeight='thin'>
                      Team Treasury
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      fontWeight='light'
                      color='gray'
                    >
                      Your vault will store your Team&apos;s assets, like
                      fungible tokens and NFTs.
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
                              Allowlist Assets
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {true ? 'Yes' : 'No'}
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
                              Asset Count
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {defaultTo(data?.listOfAllowedTokens.length, 0)}
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
                <Link
                  href={getExplorerLink(transaction?.data?.tx_id)}
                  target='_blank'
                >
                  <Button variant='dark' isFullWidth>
                    View transaction
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Button
                variant={!extension ? 'secondary' : 'outline'}
                isDisabled={isLoading || !!extension}
                onClick={() =>
                  sdk.deployer.deployVault({
                    contractName,
                    requireAllowList: true,
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
