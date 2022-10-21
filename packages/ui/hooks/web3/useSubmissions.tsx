// Hook (use-submissions.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { useDAO } from 'ui/hooks';
import { getSubmissions } from 'api/clubs';

export function useSubmissions(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['submissions', dao?.id, stxAddress, filter],
    getSubmissions,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
