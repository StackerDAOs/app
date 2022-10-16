// Hook (use-submissions.tsx)
import { useQuery } from 'react-query';
import { useDAO } from 'ui/hooks';
import { getSubmissions } from 'api/clubs';

export function useSubmissions(filter = 'all') {
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['submissions', dao?.id, filter],
    getSubmissions,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
