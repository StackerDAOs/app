import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from 'ui';
import Avatar from 'boring-avatars';
import { useIdeas, useDAO } from 'ui/hooks';
import { SectionHeader } from 'ui/components/layout';
import { DashboardLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Card } from 'ui/components/cards';
import { capitalize, map, size } from 'lodash';
import { truncateAddress } from '@stacks-os/utils';
import { ArrowUp, ArrowDown } from 'ui/components/icons';
import { signIn } from 'next-auth/react';
import { useOpenSignMessage, useAccount } from 'ui/components';

export default function Ideas() {
  const dao = useDAO();
  const isActive = dao?.data?.active;
  const [filter, setFilter] = React.useState('recent');
  const ideas = useIdeas(filter);
  const { stxAddress } = useAccount();
  const { openSignMessage } = useOpenSignMessage();

  const handleResult = React.useCallback(async (response: any) => {
    if (response?.status === 200) {
      console.log('success', response);
    }
    console.log('error', response);
  }, []);

  const popupMessageSign = React.useCallback(async (message: string) => {
    try {
      const { signature, publicKey }: any = await openSignMessage({
        message,
      });
      const response = await signIn('credentials', {
        message,
        signature,
        publicKey,
        stxAddress,
        redirect: false,
      });

      handleResult(response);
    } catch (error) {
      console.error({ error });
    }
  }, []);

  const handleUpvote = (ideaId: string) => {
    fetch(`/api/upvote/${ideaId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data?.error) {
          popupMessageSign('Sign in to upvote');
        }
      }),
    );
  };

  const handleDownvote = (ideaId: string) => {
    fetch(`/api/downvote/${ideaId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data?.error) {
          popupMessageSign('Sign in to downvote');
        }
      }),
    );
  };

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
                Ideas are not active yet
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
                <Button variant='default' size='sm' isDisabled>
                  Activate
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
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
        <Stack spacing='1'>
          <SectionHeader
            justify={{ base: 'flex-start', md: 'space-between' }}
            align={{ base: 'flex-start', md: 'space-between' }}
            color='light.900'
          >
            <Stack spacing='3'>
              <Text fontSize='md' fontWeight='light' color='text-muted'>
                Discover Ideas
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Ideas
              </Heading>
            </Stack>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup onChange={setFilter} value={filter}>
                <Stack direction='row'>
                  {map(['recent', 'most popular'], (tab: string) => (
                    <Radio size='md' value={tab} _focus={{ outline: 'none' }}>
                      {capitalize(tab)}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Stack>
          </SectionHeader>
          <Stack spacing='8' pb='16' mt='6'>
            <motion.div
              variants={FADE_IN_VARIANTS}
              initial={FADE_IN_VARIANTS.hidden}
              animate={FADE_IN_VARIANTS.enter}
              exit={FADE_IN_VARIANTS.exit}
              transition={{ duration: 0.25, type: 'linear' }}
            >
              <Grid
                templateColumns='repeat(5, 1fr)'
                gap='5'
                py={{ base: '6', md: '6' }}
              >
                <GridItem colSpan={5}>
                  <Stack spacing='6'>
                    {map(ideas?.data, (submission) => (
                      <motion.div
                        variants={FADE_IN_VARIANTS}
                        initial={FADE_IN_VARIANTS.hidden}
                        animate={FADE_IN_VARIANTS.enter}
                        exit={FADE_IN_VARIANTS.exit}
                        transition={{ duration: 0.25, type: 'linear' }}
                      >
                        <Card
                          h='fit-content'
                          bg='dark.900'
                          p={{ base: '3', md: '3' }}
                          cursor='pointer'
                        >
                          <Stack>
                            <Stack px={{ base: '3', md: '3' }}>
                              <HStack
                                justify='flex-start'
                                align='flex-start'
                                spacing='8'
                                py='3'
                              >
                                <Stack
                                  spacing='1'
                                  align='center'
                                  minW='35px'
                                  zIndex='2'
                                >
                                  <ArrowUp
                                    fontSize='xl'
                                    color={
                                      submission.votes[0] &&
                                      submission.votes[0].direction === 1
                                        ? 'primary.900'
                                        : 'gray'
                                    }
                                    onClick={
                                      size(submission.votes) !== 0
                                        ? () => handleUpvote(submission.id)
                                        : () => alert('You already voted')
                                    }
                                  />
                                  <Text
                                    maxW='xl'
                                    mx='auto'
                                    color={
                                      submission.votes[0]
                                        ? 'primary.900'
                                        : 'light.900'
                                    }
                                    fontSize='xl'
                                    fontWeight='medium'
                                  >
                                    {submission.votes.length || '0'}
                                  </Text>
                                  <ArrowDown
                                    fontSize='xl'
                                    color={
                                      submission.votes[0] &&
                                      submission.votes[0].direction === 2
                                        ? 'primary.900'
                                        : 'gray'
                                    }
                                    onClick={
                                      size(submission.votes) === 0
                                        ? () => handleDownvote(submission.id)
                                        : () => alert('You already voted')
                                    }
                                  />
                                </Stack>
                                <Stack spacing='1' align='flex-start'>
                                  <Text
                                    maxW='xl'
                                    color='light.900'
                                    fontSize='xl'
                                    fontWeight='medium'
                                  >
                                    {submission.title}
                                  </Text>
                                  <Text
                                    color='light.900'
                                    fontSize='lg'
                                    fontWeight='light'
                                  >
                                    {submission.description}
                                  </Text>
                                </Stack>
                              </HStack>
                            </Stack>
                            <Divider borderColor='dark.500' />
                            <HStack
                              justify='space-between'
                              py='0'
                              px={{ base: '3', md: '3' }}
                            >
                              <HStack spacing='3'>
                                <Avatar
                                  size={20}
                                  name={stxAddress}
                                  variant='beam'
                                  colors={[
                                    '#27cb9f',
                                    '#624AF2',
                                    '#EB00FF',
                                    '#7301FA',
                                    '#25C2A0',
                                  ]}
                                />
                                <Text
                                  color='light.500'
                                  fontSize='sm'
                                  fontWeight='regular'
                                >
                                  Submitted by{' '}
                                  <Text
                                    as='span'
                                    color='light.500'
                                    fontWeight='semibold'
                                  >
                                    {truncateAddress(submission.submitted_by)}
                                  </Text>
                                </Text>
                              </HStack>
                              <Button variant='dark' size='sm'>
                                Read more
                              </Button>
                            </HStack>
                          </Stack>
                        </Card>
                      </motion.div>
                    ))}
                  </Stack>
                </GridItem>
              </Grid>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}

Ideas.getLayout = (page: any) => (
  <DashboardLayout
    header={
      <Flex justify='space-between' align='center' py='5' px='4'>
        <Heading size='md' fontWeight='black' letterSpacing='tight'>
          Ideas
        </Heading>
        <Button variant='default' size='sm' isDisabled>
          Create Idea
        </Button>
      </Flex>
    }
  >
    {page}
  </DashboardLayout>
);
