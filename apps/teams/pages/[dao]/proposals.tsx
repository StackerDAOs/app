import React from 'react';
import Link from 'next/link';
import { StacksSDK } from 'sdk';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Tooltip,
} from 'ui';
import { useAccount, useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { SectionHeader } from 'ui/components/layout';
import { ConnectButton } from 'ui/components/buttons';
import { CreateProposal } from '@components/drawers';
import { useTeam, useTeamProposals, useTeamSubmissions } from 'ui/hooks';
import { findExtension } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { capitalize, map, size } from 'lodash';
import { useActivateTeam, useCreateProposal } from 'api/teams/mutations';
import { InfoIcon } from 'ui/components/icons';

const MotionGrid = motion(SimpleGrid);

export default function Proposals() {
  const [filter, setFilter] = React.useState('active');
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const slug = router.query?.dao as any;
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const dao = useTeam();
  const isActive = dao?.data?.active;
  const activate = useActivateTeam();

  const sdk = new StacksSDK(dao?.data?.contract_address);
  const multisigExtension = findExtension(dao?.data?.extensions, 'Team');
  const proposals = useTeamProposals();
  const submissions = useTeamSubmissions();
  const createProposal = useCreateProposal();

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
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing='8'>
            <Grid templateColumns='repeat(9, 1fr)' gap={6}>
              <GridItem colSpan={4}>
                <Card bg='dark.800'>
                  <Stack
                    px={{ base: '6', md: '6' }}
                    py={{ base: '6', md: '6' }}
                    spacing='6'
                  >
                    <Heading
                      color='light.900'
                      fontSize='lg'
                      fontWeight='regular'
                      letterSpacing='tight'
                    >
                      Proposal Stats
                    </Heading>
                    <Stack spacing='3' justify='center' h='full'>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Submitted
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          2
                        </Text>
                      </HStack>
                      <HStack justify='space-between'>
                        <Text fontSize='md' fontWeight='regular' color='gray'>
                          Executed
                        </Text>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          1
                        </Text>
                      </HStack>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
              <GridItem colSpan={5}>
                <Stack spacing='3'>
                  <Card bg='dark.900' border='1px solid' borderColor='dark.500'>
                    <Box
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      bg='dark.700'
                      borderTopLeftRadius='lg'
                      borderTopRightRadius='lg'
                    >
                      <HStack spacing='2'>
                        <Tooltip
                          label='The proposal queue is a list of proposal contracts waiting to be confirmed by the Stacks blockchain. Once confirmed, you can submit these contracts as proposals. They will be available for voting based on the rules of your Team.'
                          fontSize='sm'
                          bg='dark.800'
                          borderColor='dark.500'
                          borderWidth='1px'
                          p='3'
                          shouldWrapChildren
                        >
                          <InfoIcon />
                        </Tooltip>
                        <Text
                          fontSize='md'
                          fontWeight='medium'
                          color='light.900'
                        >
                          Proposal Queue
                        </Text>
                      </HStack>
                    </Box>
                    <Stack
                      spacing={{ base: '0', md: '1' }}
                      justify='center'
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                      h={submissions?.data?.length === 0 ? '30vh' : 'auto'}
                    >
                      <Stack spacing='3'>
                        {submissions?.data?.length === 0 && (
                          <HStack justify='center' cursor='default'>
                            <Text fontSize='md' fontWeight='light' color='gray'>
                              No Submissions found
                            </Text>
                          </HStack>
                        )}
                        {submissions?.data?.length !== 0 && (
                          <Stack spacing='6' py='3'>
                            {submissions?.data?.map((submission: any) => (
                              <Grid
                                templateColumns='repeat(5, 1fr)'
                                gap={8}
                                alignItems='center'
                              >
                                <GridItem colSpan={{ base: 2, md: 4 }}>
                                  <Stack spacing='2'>
                                    {size([]) < 6 && (
                                      <Tag
                                        color='yellow.500'
                                        bg='dark.800'
                                        alignSelf='self-start'
                                        size='sm'
                                        borderRadius='3xl'
                                      >
                                        <Text as='span' fontWeight='regular'>
                                          {truncateAddress(
                                            submission?.contract_address,
                                          )}
                                        </Text>
                                      </Tag>
                                    )}
                                    <HStack align='flex-start' spacing='4'>
                                      <Stack spacing='1' maxW='lg'>
                                        <Heading size='xs' fontWeight='black'>
                                          {submission?.title}
                                        </Heading>
                                      </Stack>
                                    </HStack>
                                  </Stack>
                                </GridItem>
                                <GridItem colSpan={{ base: 1, md: 1 }}>
                                  <Button
                                    variant='secondary'
                                    size='sm'
                                    onClick={() =>
                                      sdk.submit({
                                        extensionAddress:
                                          multisigExtension?.contract_address,
                                        proposalAddress:
                                          submission?.contract_address,
                                        onFinish(payload) {
                                          const { txId } = payload;
                                          createProposal.mutate({
                                            contract_address:
                                              submission?.contract_address,
                                            proposed_by: stxAddress as string,
                                            tx_id: txId,
                                          });
                                        },
                                      })
                                    }
                                  >
                                    Submit
                                  </Button>
                                </GridItem>
                              </Grid>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
        <Grid templateColumns='repeat(6, 1fr)' gap={6}>
          <GridItem colSpan={6}>
            <Stack spacing='8' pb='16' mt='6'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack py={{ base: '6', md: '6' }} spacing='6'>
                  <SectionHeader
                    justify={{ base: 'flex-start', md: 'space-between' }}
                    align={{ base: 'flex-start', md: 'space-between' }}
                    color='light.900'
                  >
                    <Stack spacing='3'>
                      <Text fontSize='md' fontWeight='light' color='text-muted'>
                        Explore
                      </Text>
                      <Heading mt='0 !important' size='lg' fontWeight='medium'>
                        Proposals
                      </Heading>
                    </Stack>
                    <Stack align='center' direction='row' spacing='3'>
                      <RadioGroup onChange={setFilter} value={filter}>
                        <Stack direction='row'>
                          {map(
                            ['active', 'pending', 'executed'],
                            (tab: string) => (
                              <Radio
                                size='sm'
                                value={tab}
                                _focus={{ outline: 'none' }}
                              >
                                {capitalize(tab)}
                              </Radio>
                            ),
                          )}
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </SectionHeader>
                  <MotionGrid
                    variants={FADE_IN_VARIANTS}
                    initial={FADE_IN_VARIANTS.hidden}
                    animate={FADE_IN_VARIANTS.enter}
                    exit={FADE_IN_VARIANTS.exit}
                    transition={{ duration: 0.5, type: 'linear' }}
                    columns={{ base: 1, md: 2, lg: 2 }}
                    spacing='6'
                    color='white'
                  >
                    {map(
                      proposals?.data,
                      ({
                        contract_address: contractAddress,
                        submission: { title, description },
                      }) => (
                        <motion.div
                          variants={FADE_IN_VARIANTS}
                          initial={FADE_IN_VARIANTS.hidden}
                          animate={FADE_IN_VARIANTS.enter}
                          exit={FADE_IN_VARIANTS.exit}
                          transition={{ duration: 0.25, type: 'linear' }}
                          whileHover={{
                            scale: 1.015,
                          }}
                          whileTap={{
                            scale: 1,
                          }}
                        >
                          <Link href={`/${slug}/proposals/${contractAddress}`}>
                            <Card
                              bg='dark.700'
                              display='flex'
                              alignItems='flex-start'
                              minH='200px'
                              position='relative'
                              px={{ base: '6', md: '6' }}
                              py={{ base: '6', md: '6' }}
                              _hover={{
                                cursor: 'pointer',
                              }}
                            >
                              <Stack direction='row' justify='center'>
                                <Stack
                                  spacing='4'
                                  direction={{
                                    base: 'row',
                                    md: 'column',
                                  }}
                                  justify='space-between'
                                  color='white'
                                >
                                  <HStack justify='space-between'>
                                    <HStack>
                                      <Badge
                                        bg='dark.500'
                                        color='primary.900'
                                        size='sm'
                                        py='1'
                                        px='5'
                                        borderRadius='3xl'
                                      >
                                        Pending
                                      </Badge>
                                    </HStack>
                                  </HStack>
                                  <Stack>
                                    <HStack spacing='3' justify='space-between'>
                                      <Stack direction='column' spacing='3'>
                                        <HStack align='center' spacing='2'>
                                          <Text
                                            fontWeight='black'
                                            fontSize='lg'
                                            lineHeight='1.15'
                                          >
                                            {title}
                                          </Text>
                                        </HStack>
                                        <Text
                                          fontWeight='regular'
                                          fontSize='sm'
                                          color='gray'
                                          overflow='hidden'
                                          textOverflow='ellipsis'
                                          style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            lineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                          }}
                                        >
                                          {description}
                                        </Text>
                                      </Stack>
                                    </HStack>
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Card>
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </MotionGrid>
                </Stack>
              </motion.div>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </motion.div>
  );
}

const Header = () => {
  const dao = useTeam();
  const isActive = dao?.data?.active;

  return (
    <Flex justify='space-between' align='center' py='5' px='4'>
      <Heading size='md' fontWeight='black' letterSpacing='tight'>
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
