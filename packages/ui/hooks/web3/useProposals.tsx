// Hook (use-proposals.tsx)
import { useQuery } from 'react-query';
import { useDAO } from 'ui/hooks';
import { getProposals } from 'api/clubs';

export function useProposals() {
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposals', dao?.id],
    getProposals,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
