import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Stack,
  Tag,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from 'ui';
import { useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { ProposalCard, SubmissionCard } from '@components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { ConnectButton } from 'ui/components/buttons';
import { CreateProposal } from '@components/drawers';
import { useTeam, useTeamProposals, useTeamSubmissions } from 'ui/hooks';
import { map, size } from 'lodash';
import { useActivateTeam } from 'api/teams/mutations';

export default function Proposals() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const dao = useTeam();
  const isActive = dao?.data?.active;
  const activate = useActivateTeam();
  const proposals = useTeamProposals();
  const submissions = useTeamSubmissions();

  if (dao?.isLoading && dao?.isFetching) {
    return null;
  }

  if (!isActive) {
    return (
      <Stack align='center' justify='center' h='75vh'>
        <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='25vw'>
          <Box
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
            bg='dark.700'
            borderTopLeftRadius='lg'
            borderTopRightRadius='lg'
          >
            <HStack justify='center'>
              <Text fontSize='md' fontWeight='medium' color='light.900'>
                Dashboard is not active yet
              </Text>
            </HStack>
          </Box>
          <Stack
            spacing={{ base: '0', md: '1' }}
            justify='center'
            py={{ base: '3', md: '3' }}
            px={{ base: '6', md: '6' }}
          >
            <Stack spacing='3'>
              <HStack justify='center' cursor='default'>
                <Button
                  variant='default'
                  size='sm'
                  onClick={() => {
                    activate.mutate({
                      contract_address: dao?.data?.contract_address,
                    });
                  }}
                  isLoading={activate.isLoading}
                >
                  Activate
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  }

  if (!isSignedIn) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack align='center' textAlign='center' spacing='3'>
            <Stack spacing='1'>
              <Heading size='md' fontWeight='light'>
                Connect your wallet
              </Heading>
              <Text color='gray' maxW='md'>
                Sign in to verify your membership and access to the Club.
              </Text>
            </Stack>
            <ConnectButton
              variant='default'
              size='md'
              _hover={{ opacity: 0.9 }}
              _active={{ opacity: 1 }}
            />
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  if (!dao?.data) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          <Stack align='center' textAlign='center' spacing='3'>
            <Stack spacing='1'>
              <Heading size='md' fontWeight='light'>
                No clubs found for{' '}
                <Text
                  as='span'
                  fontWeight='black'
                  bgGradient='linear(to-br, primary.900 25%, primary-accent.900 100%)'
                  bgClip='text'
                >
                  {router.query?.dao}
                </Text>
              </Heading>
              <Text color='gray' maxW='md'>
                Make sure you have the correct Club name and try again.
              </Text>
            </Stack>
            <Link href='/create'>
              <Button variant='default'>Create a Club</Button>
            </Link>
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.25, type: 'linear' }}
    >
      <Stack spacing='1'>
        <Tabs color='light.900' variant='unstyled' isFitted defaultIndex={1}>
          <TabList>
            <ButtonGroup>
              {map(['Queue', 'Proposals'], (item) => (
                <Tab
                  key={item}
                  borderWidth='1px'
                  borderRadius='lg'
                  borderColor='transparent'
                  color='light.500'
                  fontSize='sm'
                  _selected={{
                    borderColor: 'dark.500',
                    color: 'light.900',
                    bg: 'dark.700',
                  }}
                >
                  <HStack justify='center'>
                    <Text>{item}</Text>
                    {item === 'Queue' && size(submissions?.data) > 0 && (
                      <Tag
                        color='light.500'
                        bg='dark.500'
                        size='sm'
                        borderRadius='3xl'
                      >
                        <Text as='span' fontWeight='regular'>
                          {submissions?.data?.length}
                        </Text>
                      </Tag>
                    )}
                    {item === 'Proposals' && size(proposals?.data) > 0 && (
                      <Tag
                        color='light.500'
                        bg='dark.500'
                        size='sm'
                        borderRadius='3xl'
                      >
                        <Text as='span' fontWeight='regular'>
                          {proposals?.data?.length}
                        </Text>
                      </Tag>
                    )}
                  </HStack>
                </Tab>
              ))}
            </ButtonGroup>
          </TabList>
          <TabPanels>
            <TabPanel px='0'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack spacing='0'>
                  {size(submissions?.data) === 0 && (
                    <Stack
                      align='center'
                      justify='center'
                      h='50vh'
                      textAlign='center'
                      spacing='3'
                    >
                      <Stack spacing='1'>
                        <Heading size='md' fontWeight='light'>
                          No contracts found
                        </Heading>
                        <Text color='gray' maxW='md'>
                          Your proposal contracts will appear here.
                        </Text>
                      </Stack>
                    </Stack>
                  )}
                  {map(submissions?.data, (submission) => (
                    <SubmissionCard submission={submission} />
                  ))}
                </Stack>
              </motion.div>
            </TabPanel>
            <TabPanel px='0'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack spacing='0'>
                  {size(proposals?.data) === 0 && (
                    <Stack
                      align='center'
                      justify='center'
                      h='50vh'
                      textAlign='center'
                      spacing='3'
                    >
                      <Stack spacing='1'>
                        <Heading size='md' fontWeight='light'>
                          No proposals found
                        </Heading>
                        <Text color='gray' maxW='md'>
                          Submitted proposal contracts will appear here.
                        </Text>
                      </Stack>
                    </Stack>
                  )}
                  {map(proposals?.data, (proposal) => (
                    <ProposalCard proposal={proposal} />
                  ))}
                </Stack>
              </motion.div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </motion.div>
  );
}

const Header = () => {
  const dao = useTeam();
  const isActive = dao?.data?.active;

  return (
    <Flex justify='space-between' align='center' py='6' px='10'>
      <Heading size='lg' fontWeight='black' letterSpacing='tight'>
        Proposals
      </Heading>
      <CreateProposal
        title='Create proposal'
        variant='default'
        size='sm'
        isDisabled={!isActive}
        _hover={{ opacity: 0.9 }}
      />
    </Flex>
  );
};

Proposals.getLayout = (page: any) => (
  <DashboardLayout header={<Header />}>{page}</DashboardLayout>
);
