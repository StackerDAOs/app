import React from 'react';
import { useRouter } from 'next/router';
import { Button, Stack, Text } from 'ui';
import { useTeam, useTeamProposal } from 'ui/hooks';
import { AppLayout } from '@components/layout';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { findExtension, generatePostConditions } from 'utils';
import { StacksSDK } from 'sdk';

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
      <Stack spacing='6'>
        <Button
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
          Approve
        </Button>
        <Text>Signals received: {proposal?.data?.signalsReceived}</Text>
        <Text>Signals required: {proposal?.data?.signalsRequired}</Text>
      </Stack>
    </motion.div>
  );
}

ProposalView.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
