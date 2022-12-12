import React from 'react';
import Link from 'next/link';
import { Badge, Button, Flex, GridItem, Heading, Stack, Text } from 'ui';
import { StacksSDK } from 'sdk';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { defaultTo } from 'lodash';
import { useGenerateName, useTransaction } from 'ui/hooks';
import { getTransaction } from 'api/teams';
import { useTeamMembershipStore } from 'store';
import { findExtension, getExplorerLink } from 'utils';
import { TEAM_EXTENSION_TYPES } from 'api/constants';
import { useCreateExtension } from 'api/teams/mutations/extensions';

export const TeamMembershipCard = (props: any) => {
  const { isLoading, dao } = props;
  const sdk = new StacksSDK(dao?.contract_address);
  const data = useTeamMembershipStore((state) => state.team);
  const members = useTeamMembershipStore((state) => state.team.members);
  const extension = findExtension(dao?.extensions, 'Team');
  const transaction = useTransaction(extension?.tx_id);
  const formIsValidated = data;
  const createExtension = useCreateExtension();
  const { randomName: contractName } = useGenerateName();
  const onFinish = (payload: any) => {
    setTimeout(async () => {
      const { txId } = payload;
      const tx = await getTransaction(txId);
      const contractAddress = tx?.smart_contract?.contract_id;
      if (!contractAddress) {
        throw new Error('No contract address returned from transaction.');
      } else {
        try {
          createExtension.mutate({
            team_id: dao?.id,
            contract_address: contractAddress,
            extension_type_id: TEAM_EXTENSION_TYPES.TEAM,
            tx_id: txId,
            config: {
              members,
              signalsRequired: data?.signalsRequired,
            },
          });
        } catch (e: any) {
          console.error({ e });
        }
      }
    }, 1000);
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
                    Multisignature
                  </Text>
                </Badge>
                <Stack
                  spacing={{ base: '4', md: '6' }}
                  maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
                >
                  <Stack spacing='3'>
                    <Heading size='2xl' fontWeight='thin'>
                      Team Membership
                    </Heading>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      fontWeight='light'
                      color='gray'
                    >
                      Team members will be able to sign off on proposals and
                      manage the team&apos;s treasury.
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
                              Signals Required
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {data?.signalsRequired}
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
                              Total Members
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              {defaultTo(members.length, 1)}
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
                              Member Limit
                            </Text>
                            <Text
                              fontSize='lg'
                              fontWeight='thin'
                              color='light.500'
                            >
                              No limit
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
                isDisabled={isLoading || !!extension || !formIsValidated}
                onClick={() =>
                  sdk.deployer.deployMultisig({
                    contractName,
                    onFinish,
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
