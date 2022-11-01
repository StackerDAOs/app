import React from 'react';
import {
  Divider,
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
import { useIdeas } from 'ui/hooks';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { ProposalHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';
import { Card } from 'ui/components/cards';
import { capitalize, map, size } from 'lodash';
import { truncateAddress } from '@stacks-os/utils';
import { ArrowUp, ArrowDown } from 'ui/components/icons';
import { signIn } from 'next-auth/react';
import { useOpenSignMessage, useAccount } from 'ui/components';

export default function Ideas() {
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
        redirect: false,
      });

      handleResult(response);
    } catch (error) {
      console.error({ error });
    }
  }, []);

  const handleUpvote = () => {
    fetch('/api/upvote', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    }).then((res) =>
      res.json().then((data) => {
        console.log({ data });
        if (data?.error) {
          popupMessageSign('Sign in to upvote');
        }
      }),
    );
  };

  const handleDownvote = () => {
    fetch('/api/downvote', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    }).then((res) =>
      res.json().then((data) => {
        console.log({ data });
        if (data?.error) {
          popupMessageSign('Sign in to downvote');
        }
      }),
    );
  };

  if (ideas.isLoading || ideas?.isIdle) {
    return null;
  }

  if (size(ideas?.data) < 1) {
    return (
      <Stack spacing='8' pb='16' mt='6'>
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 0.25, type: 'linear' }}
        >
          <Stack spacing='0'>
            <Stack
              px={{ base: '6', md: '6' }}
              py={{ base: '6', md: '6' }}
              spacing='2'
            >
              <EmptyState align='center' textAlign='center' spacing='3'>
                <Stack spacing='1'>
                  <Heading size='md' fontWeight='light'>
                    No ideas found
                  </Heading>
                  <Text color='gray' maxW='md'>
                    Deploy the first proposal submission to get started.
                  </Text>
                </Stack>
              </EmptyState>
            </Stack>
          </Stack>
        </motion.div>
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
      <Wrapper>
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
                justifyItems='center'
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
                            <Stack p={{ base: '3', md: '3' }}>
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
                                    color='primary.900'
                                    onClick={handleUpvote}
                                  />
                                  <Text
                                    maxW='xl'
                                    mx='auto'
                                    color='primary.900'
                                    fontSize='xl'
                                    fontWeight='medium'
                                  >
                                    {submission.votes || '0'}
                                  </Text>
                                  <ArrowDown
                                    fontSize='xl'
                                    color='gray'
                                    onClick={handleDownvote}
                                  />
                                </Stack>
                                <Stack spacing='0' align='flex-start'>
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
                              p={{ base: '3', md: '3' }}
                            >
                              <HStack spacing='3'>
                                <Avatar
                                  size={20}
                                  name={stxAddress}
                                  variant='beam'
                                  colors={[
                                    '#50DDC3',
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
                              <Text
                                color='light.500'
                                fontSize='sm'
                                fontWeight='regular'
                              >
                                ~ 3 hours ago{' '}
                              </Text>
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
      </Wrapper>
    </motion.div>
  );
}

Ideas.getLayout = (page: any) => (
  <AppLayout header={<ProposalHeader />}>{page}</AppLayout>
);
