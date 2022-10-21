// Hook (use-proposal.tsx)
import { useQuery } from 'react-query';
import { useExtension } from 'ui/hooks';
import { getProposal } from 'api/clubs';

export function useProposal(id: string) {
  const votingExtension = useExtension('Voting');

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      return await getProposal(votingExtension?.data?.contract_address, id);
    },
    {
      enabled: !!votingExtension?.data,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
