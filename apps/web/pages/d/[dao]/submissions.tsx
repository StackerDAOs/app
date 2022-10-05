import React from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarGroup,
  Button,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from 'ui';
import Avatar from 'boring-avatars';
import { useSubmissions } from 'ui/hooks';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { ProposalHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';
import { Card } from 'ui/components/cards';
import { capitalize, map, padStart } from 'lodash';
import { truncateAddress } from '@stacks-os/utils';
import { ChevronDown, ChevronUp } from 'ui/components/icons';

export default function Submissions() {
  const [filter, setFilter] = React.useState('recent');
  const submissions = useSubmissions(filter);

  if (submissions.isLoading || submissions?.isFetching || submissions?.isIdle) {
    return null;
  }

  if (submissions?.data?.length === 0) {
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
                    No submissions found
                  </Heading>
                  <Text color='gray' maxW='md'>
                    Deploy the first proposal submission to get started.
                  </Text>
                </Stack>
                <Button variant='default'>Create proposal</Button>
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
                Submissions
              </Heading>
            </Stack>
            <Stack align='center' direction='row' spacing='3'>
              <RadioGroup onChange={setFilter} value={filter}>
                <Stack direction='row'>
                  {map(
                    ['recent', 'most popular', 'submitted'],
                    (tab: string) => (
                      <Radio size='md' value={tab} _focus={{ outline: 'none' }}>
                        {capitalize(tab)}
                      </Radio>
                    ),
                  )}
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
              <Stack py={{ base: '6', md: '6' }} spacing='6'>
                {map(submissions?.data, (submission) => (
                  <Card
                    h='fit-content'
                    bg='dark.900'
                    px={{ base: '3', md: '3' }}
                    py={{ base: '3', md: '3' }}
                    _hover={{ bg: 'dark.800', cursor: 'pointer' }}
                  >
                    <HStack justify='space-between' align='center' spacing='3'>
                      <HStack align='center' spacing='3'>
                        <Text
                          maxW='xl'
                          mx='auto'
                          color='light.500'
                          fontSize='3xl'
                          fontWeight='light'
                        >
                          {padStart(submission?.id, 3, '0')}.
                        </Text>
                        <Stack spacing='0'>
                          <Text
                            maxW='xl'
                            mx='auto'
                            color='light.900'
                            fontSize='lg'
                            fontWeight='black'
                          >
                            {submission.title}
                          </Text>
                          <Text
                            maxW='xl'
                            mx='auto'
                            color='gray'
                            fontSize='sm'
                            fontWeight='regular'
                          >
                            submitted by{' '}
                            {truncateAddress(submission.submitted_by)}
                          </Text>
                        </Stack>
                      </HStack>
                      <HStack align='center' justify='flex-end' spacing='6'>
                        <AvatarGroup size='md' max={2}>
                          <ChakraAvatar>
                            <Avatar
                              size={1000}
                              name={`${submission?.id}-${submission?.submitted_by}`}
                              variant='beam'
                              colors={[
                                '#50DDC3',
                                '#624AF2',
                                '#EB00FF',
                                '#7301FA',
                                '#25C2A0',
                              ]}
                            />
                          </ChakraAvatar>
                          <ChakraAvatar>
                            <Avatar
                              size={1000}
                              name={`${submission?.id}-${submission?.tx_id}`}
                              variant='beam'
                              colors={[
                                '#50DDC3',
                                '#624AF2',
                                '#EB00FF',
                                '#7301FA',
                                '#25C2A0',
                              ]}
                            />
                          </ChakraAvatar>
                          <ChakraAvatar>
                            <Avatar
                              size={1000}
                              name={`${submission?.id}-${submission?.title}`}
                              variant='beam'
                              colors={[
                                '#50DDC3',
                                '#624AF2',
                                '#EB00FF',
                                '#7301FA',
                                '#25C2A0',
                              ]}
                            />
                          </ChakraAvatar>
                        </AvatarGroup>
                        <Stack spacing='0' align='center'>
                          <ChevronUp fontSize='lg' />
                          <Text
                            maxW='xl'
                            mx='auto'
                            color='light.900'
                            fontSize='xl'
                            fontWeight='black'
                          >
                            {submission.votes}
                          </Text>
                          <ChevronDown fontSize='lg' />
                        </Stack>
                      </HStack>
                    </HStack>
                  </Card>
                ))}
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Submissions.getLayout = (page: any) => (
  <AppLayout header={<ProposalHeader />}>{page}</AppLayout>
);
