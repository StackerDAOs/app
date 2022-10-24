// Hook (use-ideas.tsx)
import { useQuery } from 'react-query';
import { useAccount } from 'ui/components';
import { useDAO } from 'ui/hooks';
import { getIdeas } from 'api/clubs';

export function useIdeas(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['ideas', dao?.id, stxAddress, filter],
    getIdeas,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
