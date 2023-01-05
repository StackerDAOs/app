// Hook (use-proposal.tsx)
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'ui/components';
import { useExtension, useTeamExtension } from 'ui/hooks';
import { getProposal } from 'api/clubs';
import { getProposal as getTeamProposal } from 'api/teams';

export function useProposal(id: string) {
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const votingExtension = useExtension('Voting');

  const { isFetching, isLoading, isError, data } = useQuery(
    ['proposal', id, stxAddress],
    async () => {
      return await getProposal(votingExtension?.data?.contract_address, id);
    },
    {
      enabled: !!votingExtension?.data,
    },
  );

  return { isFetching, isLoading, isError, data };
}

export function useTeamProposal(id: string) {
  const account = useAccount();
  const stxAddress = account?.stxAddress as string;
  const multisigExtension = useTeamExtension('Team');

  const { isFetching, isLoading, isError, data } = useQuery(
    ['proposal', id, stxAddress],
    async () => {
      return await getTeamProposal(
        multisigExtension?.data?.contract_address,
        id,
        stxAddress,
      );
    },
    {
      enabled: !!multisigExtension?.data,
    },
  );

  return { isFetching, isLoading, isError, data };
}
