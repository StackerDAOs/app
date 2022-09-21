import React from 'react';
import { Heading, Stack, Text } from 'ui';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { VotingHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';

export default function Voting() {
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
                Explore Submissions
              </Text>
              <Heading mt='0 !important' size='lg' fontWeight='medium'>
                Proposals
              </Heading>
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
              <Stack spacing='0'>
                <Stack
                  px={{ base: '6', md: '6' }}
                  py={{ base: '6', md: '6' }}
                  spacing='2'
                >
                  <EmptyState align='center' textAlign='center' spacing='3'>
                    <Stack spacing='1'>
                      <Heading size='md' fontWeight='light'>
                        No proposals found.
                      </Heading>
                      <Text color='gray' maxW='md'>
                        Proposals are submissions that can be voted on.
                      </Text>
                    </Stack>
                  </EmptyState>
                </Stack>
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Voting.getLayout = (page: any) => (
  <AppLayout header={<VotingHeader />}>{page}</AppLayout>
);
