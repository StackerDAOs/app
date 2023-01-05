// Hook (use-submissions.tsx)
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'ui/components';
import { useDAO, useTeam } from 'ui/hooks';
import { getSubmissions } from 'api/clubs';
import { getSubmissions as getTeamSubmissions } from 'api/teams';

export function useSubmissions(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useDAO();
  const { isFetching, isLoading, isError, data } = useQuery(
    ['submissions', dao?.id, stxAddress, filter],
    getSubmissions,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}

export function useTeamSubmissions(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useTeam();
  const { isFetching, isLoading, isError, data } = useQuery(
    ['submissions', dao?.id, stxAddress, filter],
    getTeamSubmissions,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}
