import React from 'react';
import { Heading, Stack, Text } from 'ui';
import { SectionHeader } from 'ui/components/layout';
import { AppLayout } from '@components/layout';
import { ProposalHeader } from '@components/navigation';
import { Wrapper } from '@components/containers';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

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
        </Stack>
      </Wrapper>
    </motion.div>
  );
}

Proposals.getLayout = (page: any) => (
  <AppLayout header={<ProposalHeader />}>{page}</AppLayout>
);
