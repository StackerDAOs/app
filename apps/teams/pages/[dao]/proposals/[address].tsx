import React from 'react';
import { useRouter } from 'next/router';
import { Button, Divider, HStack, Stack, Text } from 'ui';
import { useTeamProposal } from 'ui/hooks';
import { useAccount } from 'ui/components';
import { Card } from 'ui/components/cards';
import { AppLayout } from '@components/layout';
import Avatar from 'boring-avatars';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { truncateAddress } from '@stacks-os/utils';

export default function ProposalView() {
  const { stxAddress } = useAccount();
  const router = useRouter();
  const { address } = router.query as any;
  const proposal = useTeamProposal(address);

  if (proposal?.isLoading) {
    return null;
  }

  return (
    <Stack spacing='6'>
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
                <Stack spacing='1' align='flex-start'>
                  <Text
                    maxW='xl'
                    color='light.900'
                    fontSize='xl'
                    fontWeight='medium'
                  >
                    {proposal?.data?.submission.title}
                  </Text>
                  <Text color='light.900' fontSize='lg' fontWeight='light'>
                    {proposal?.data?.submission.description}
                  </Text>
                </Stack>
              </HStack>
            </Stack>
            <Divider borderColor='dark.500' />
            <HStack justify='space-between' py='0' px={{ base: '3', md: '3' }}>
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
                <Text color='light.500' fontSize='sm' fontWeight='regular'>
                  Submitted by{' '}
                  <Text as='span' color='light.500' fontWeight='semibold'>
                    {truncateAddress(
                      proposal?.data?.principalAddress as string,
                    )}
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
    </Stack>
  );
}

ProposalView.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
