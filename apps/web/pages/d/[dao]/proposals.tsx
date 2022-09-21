import React from 'react';
import { Button, Heading, Stack, Text } from 'ui';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { ProposalHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';

export default function Proposals() {
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
                        Your team is still inactive
                      </Heading>
                      <Text color='gray' maxW='md'>
                        You are ready to initialize your team. Once you do, you
                        will be able to submit and vote on proposals.
                      </Text>
                    </Stack>
                    <Button variant='primary' isDisabled>
                      Initialize your team
                    </Button>
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

Proposals.getLayout = (page: any) => (
  <AppLayout header={<ProposalHeader />}>{page}</AppLayout>
);
