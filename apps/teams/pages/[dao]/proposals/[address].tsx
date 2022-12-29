import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Circle,
  Flex,
  Heading,
  HStack,
  Progress,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Divider,
} from 'ui';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { useTeam, useTeamProposal } from 'ui/hooks';
import { ProposalLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { findExtension, getExplorerLink, generatePostConditions } from 'utils';
// import { map } from 'lodash';
import { StacksSDK } from 'sdk';
// import Avatar from 'boring-avatars';
import { ArrowLeft, CheckCircle } from 'ui/components/icons';

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
  let status = '';
  const signalsReceived = proposal?.data?.signalsReceived ?? 0;
  const signalsRequired = proposal?.data?.signalsRequired ?? 0;
  const href = getExplorerLink(proposal?.data?.txId);

  if (signalsReceived === 0) {
    status = 'pending';
  } else if (signalsReceived < signalsRequired) {
    status = 'active';
  } else {
    status = 'executed';
  }

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
      <Stack spacing='10'>
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.25, type: 'linear' }}
        >
          <Stack spacing='8'>
            <Stack spacing='2'>
              <Heading
                fontSize='7xl'
                fontWeight='thin'
                color='light.900'
                maxW='3xl'
                letterSpacing='tight'
              >
                {proposal?.data?.submission?.title
                  ? proposal?.data?.submission?.title
                  : 'Untitled'}
              </Heading>
              {status === 'pending' && (
                <HStack spacing='2'>
                  <Circle size='3' bg='yellow.500' borderRadius='3xl' />
                  <HStack>
                    <Text color='light.900' fontWeight='regular'>
                      Proposal pending
                    </Text>
                    <a href={href} target='_blank' rel='noreferrer'>
                      <Text color='gray' fontWeight='regular'>
                        View transaction
                      </Text>
                    </a>
                  </HStack>
                </HStack>
              )}
              {status === 'active' && (
                <HStack spacing='2'>
                  <Circle size='3' bg='green.500' borderRadius='3xl' />
                  <HStack>
                    <Text color='light.900' fontWeight='regular'>
                      Awaiting approval
                    </Text>
                    <Text color='gray' fontWeight='regular'>
                      {signalsRequired - signalsReceived} more signature
                      required
                    </Text>
                  </HStack>
                </HStack>
              )}
              {status === 'executed' && (
                <HStack spacing='2'>
                  <Circle size='3' bg='secondary.500' borderRadius='3xl' />
                  <HStack>
                    <Text color='light.900' fontWeight='regular'>
                      Executed
                    </Text>
                    <Text color='gray' fontWeight='regular'>
                      {signalsReceived} of {signalsRequired} signatures received
                    </Text>
                  </HStack>
                </HStack>
              )}
            </Stack>
            <SimpleGrid columns={2} gap={8}>
              <Stack spacing='3'>
                <Progress
                  colorScheme='secondary'
                  borderRadius='lg'
                  size='sm'
                  value={100}
                  bg='dark.500'
                />
                <Stack>
                  <Heading size='md' fontWeight='regular' color='gray'>
                    Active Signers
                  </Heading>
                  <HStack>
                    <Text color='light.900' fontWeight='black' size='lg'>
                      {signalsReceived}
                    </Text>
                    {/* <Stack>
                      <HStack spacing='-1'>
                        {map(['ryan.stx'], (item) => (
                          <Avatar
                            size={20}
                            colors={[
                              '#624AF2',
                              '#7301fa',
                              '#eb00ff',
                              '#27cb9f',
                            ]}
                            name={item}
                            variant='beam'
                          />
                        ))}
                      </HStack>
                    </Stack> */}
                  </HStack>
                </Stack>
                {proposal?.data?.hasSignaled && (
                  <HStack spacing='1'>
                    <Icon as={CheckCircle} color='gray' />
                    <Text color='gray' fontWeight='regular'>
                      You have approved this proposal
                    </Text>
                  </HStack>
                )}
              </Stack>
              <Stack spacing='3'>
                <Progress
                  colorScheme='gray'
                  borderRadius='lg'
                  size='sm'
                  value={0}
                  bg='dark.500'
                />
                <Stack>
                  <Heading size='md' fontWeight='regular' color='gray'>
                    Inactive Signers
                  </Heading>
                  <HStack>
                    <Text color='light.900' fontWeight='black' size='lg'>
                      {signalsRequired - signalsReceived}
                    </Text>
                    {/* <Stack>
                      <HStack>
                        <Avatar
                          size={20}
                          colors={['#624AF2', '#7301fa', '#eb00ff', '#27cb9f']}
                          name='waits.btc'
                          variant='beam'
                        />
                      </HStack>
                    </Stack> */}
                  </HStack>
                </Stack>
              </Stack>
            </SimpleGrid>
            <ButtonGroup>
              {status !== 'pending' &&
                !proposal?.data?.hasSignaled &&
                proposal?.data?.isExecutable && (
                  <Button
                    variant='secondary'
                    onClick={() =>
                      sdk.submit({
                        extensionAddress: multisigExtension?.contract_address,
                        proposalAddress: address,
                        postConditions,
                        onFinish(payload) {
                          const { txId } = payload;
                          console.log({ txId });
                        },
                      })
                    }
                  >
                    Execute proposal
                  </Button>
                )}
              {status !== 'pending' &&
                !proposal?.data?.hasSignaled &&
                !proposal?.data?.isExecutable && (
                  <Button
                    variant='default'
                    onClick={() =>
                      sdk.submit({
                        extensionAddress: multisigExtension?.contract_address,
                        proposalAddress: address,
                        postConditions,
                        onFinish(payload) {
                          const { txId } = payload;
                          console.log({ txId });
                        },
                      })
                    }
                  >
                    Approve proposal
                  </Button>
                )}
            </ButtonGroup>
          </Stack>
        </motion.div>
        <Stack spacing='6'>
          <Divider borderColor='dark.500' />
          <Stack spacing='2'>
            <Heading size='lg' fontWeight='light' textTransform='uppercase'>
              tl;dr
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
        </Stack>
        <Stack spacing='6'>
          <Divider borderColor='dark.500' />
          <Stack spacing='2'>
            <Heading size='lg' fontWeight='light'>
              Description
            </Heading>
            <Text
              color='gray'
              fontSize='lg'
              fontWeight='light'
              letterSpacing='tight'
            >
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                children={proposal?.data?.submission?.body.replace(
                  /\n/gi,
                  '&nbsp; \n',
                )}
              />
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}

const Header = () => {
  const router = useRouter();
  const { address } = router.query as any;
  const proposal = useTeamProposal(address);

  return (
    <Flex justify='space-between' align='center' py='6' px='10'>
      <HStack>
        <Icon
          as={ArrowLeft}
          color='light.500'
          fontSize='lg'
          cursor='pointer'
          onClick={() => router.back()}
        />
        <Heading size='lg' fontWeight='black' letterSpacing='tight'>
          Proposal {proposal?.data?.id.toString().padStart(3, '0')}
        </Heading>
      </HStack>
    </Flex>
  );
};

ProposalView.getLayout = (page: any) => (
  <ProposalLayout header={<Header />}>{page}</ProposalLayout>
);
