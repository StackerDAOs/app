import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tag,
  Text,
} from 'ui';
import { useTeam, useTeamProposal } from 'ui/hooks';
import { DashboardLayout } from '@components/layout';
import { Card } from 'ui/components/cards';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { findExtension, generatePostConditions } from 'utils';
import { map } from 'lodash';
import { StacksSDK } from 'sdk';
import { CheckIcon } from 'ui/components/forms';

export default function ProposalView() {
  const dao = useTeam();
  const sdk = new StacksSDK(dao?.data?.contract_address);
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const router = useRouter();
  const { address } = router.query as any;
  const proposal = useTeamProposal(address);
  const postConditions = generatePostConditions({
    postConditions: proposal?.data?.submission?.post_conditions,
    isPassing: proposal?.data?.isExecutable,
  });

  if (proposal?.isLoading) {
    return null;
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Grid templateColumns='repeat(5, 1fr)' gap={12}>
        <GridItem colSpan={{ base: 5, lg: 3 }}>
          <Stack spacing='8' py={{ base: '8', md: '8' }}>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.25, type: 'linear' }}
            >
              <Stack spacing='6'>
                <Stack spacing='2'>
                  <Tag
                    color='yellow.500'
                    bg='dark.800'
                    alignSelf='self-start'
                    size='md'
                    borderRadius='3xl'
                  >
                    <Text as='span' fontWeight='regular'>
                      {proposal?.data?.signalsReceived} of{' '}
                      {proposal?.data?.signalsRequired} approvals
                    </Text>
                  </Tag>
                  <Heading fontSize='4xl' fontWeight='black' color='light.900'>
                    {proposal?.data?.submission?.title
                      ? proposal?.data?.submission?.title
                      : 'Untitled'}
                  </Heading>
                  <Text
                    color='gray'
                    fontSize='lg'
                    fontWeight='light'
                    letterSpacing='tight'
                  >
                    {proposal?.data?.submission?.description
                      ? proposal?.data?.submission?.description
                      : 'TL;DR'}
                  </Text>
                </Stack>
                <ButtonGroup>
                  {!proposal?.data?.hasSignaled &&
                    proposal?.data?.isExecutable && (
                      <Button
                        variant='secondary'
                        onClick={() =>
                          sdk.submit({
                            extensionAddress:
                              multisigExtension?.contract_address,
                            proposalAddress: address,
                            postConditions,
                            onFinish(payload) {
                              const { txId } = payload;
                              console.log({ txId });
                            },
                          })
                        }
                      >
                        Execute
                      </Button>
                    )}
                  {proposal?.data?.hasSignaled && (
                    <Button variant='dark' isDisabled>
                      Approved
                    </Button>
                  )}
                  {!proposal?.data?.hasSignaled &&
                    !proposal?.data?.isExecutable && (
                      <Button
                        variant='default'
                        onClick={() =>
                          sdk.submit({
                            extensionAddress:
                              multisigExtension?.contract_address,
                            proposalAddress: address,
                            postConditions,
                            onFinish(payload) {
                              const { txId } = payload;
                              console.log({ txId });
                            },
                          })
                        }
                      >
                        Approve
                      </Button>
                    )}
                </ButtonGroup>
              </Stack>
            </motion.div>
            <Tabs color='light.900' isFitted borderColor='dark.500'>
              <TabList>
                <ButtonGroup bg='dark.900' w='35vw'>
                  {map(['Details', 'On-chain', 'Code'], (item) => (
                    <Tab
                      key={item}
                      color='light.500'
                      fontSize='sm'
                      borderColor='dark.500'
                      _selected={{
                        boxShadow: 'none',
                        borderColor: 'secondary.900',
                      }}
                      _active={{
                        boxShadow: 'none',
                      }}
                      _focus={{
                        boxShadow: 'none',
                      }}
                    >
                      {item}
                    </Tab>
                  ))}
                </ButtonGroup>
              </TabList>
              <TabPanels>
                <TabPanel px='0' py='6'>
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.25, type: 'linear' }}
                  >
                    <Stack spacing='2'>
                      <Stack spacing='6'>
                        <Stack spacing='2'>
                          <Text
                            color='light.900'
                            fontSize='lg'
                            fontWeight='regular'
                          >
                            {proposal?.data?.submission?.body
                              ? proposal?.data?.submission?.body
                              : 'Description'}
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </motion.div>
                </TabPanel>
                <TabPanel px='0' py='6'>
                  <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.25, type: 'linear' }}
                  >
                    <Card h='fit-content' bg='dark.900' border='none'>
                      <Stack spacing='2'>
                        <Text fontSize='sm' fontWeight='semibold' color='gray'>
                          Coming soon
                        </Text>
                      </Stack>
                    </Card>
                  </motion.div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 5, lg: 2 }}>
          <Stack py={{ base: '8', md: '8' }}>
            <Card h='fit-content' bg='dark.900'>
              <Stack spacing='0'>
                <Stack
                  spacing='6'
                  justify='space-between'
                  direction='row'
                  px={{ base: '6', md: '6' }}
                  py={{ base: '3', md: '3' }}
                  bg='dark.700'
                  borderTopLeftRadius='md'
                  borderTopRightRadius='md'
                  align='center'
                >
                  <Heading
                    color='light.900'
                    fontSize='md'
                    fontWeight='regular'
                    letterSpacing='tight'
                  >
                    Status
                  </Heading>
                </Stack>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='3'
                >
                  <HStack justify='space-between' align='center' spacing='2'>
                    <Text fontSize='md' fontWeight='regular' color='light.500'>
                      Approvals Received
                    </Text>
                    <HStack
                      bg='dark.500'
                      borderRadius='lg'
                      borderColor='dark.500'
                      borderWidth='1px'
                      py='1'
                      px='3'
                    >
                      <Text
                        fontSize='sm'
                        fontWeight='semibold'
                        color='light.500'
                      >
                        {proposal?.data?.signalsReceived}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack justify='space-between' align='center' spacing='2'>
                    <Text fontSize='md' fontWeight='regular' color='light.500'>
                      Approvals Required
                    </Text>
                    <HStack
                      bg='dark.500'
                      borderRadius='lg'
                      borderColor='dark.500'
                      borderWidth='1px'
                      py='1'
                      px='3'
                    >
                      <Text
                        fontSize='sm'
                        fontWeight='semibold'
                        color='light.500'
                      >
                        {proposal?.data?.signalsRequired}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack justify='space-between' align='center' spacing='2'>
                    <Text fontSize='md' fontWeight='regular' color='light.500'>
                      Voted
                    </Text>
                    <Text
                      fontSize='sm'
                      fontWeight='semibold'
                      color='light.500'
                      py='1'
                      px='3'
                    >
                      {proposal?.data?.hasSignaled ? (
                        <Icon as={CheckIcon} color='green.500' />
                      ) : (
                        'No'
                      )}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </GridItem>
      </Grid>
    </motion.div>
  );
}

ProposalView.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
