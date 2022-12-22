import { useQuery, useInfiniteQuery } from 'react-query';
import { useDAO, useTeam } from 'ui/hooks';
import { getProposals } from 'api/clubs';
import { getProposals as getTeamProposals } from 'api/teams';

// Hook (use-proposals.tsx)
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

// Hook (use-team-proposals.tsx)
export function useTeamProposals() {
  const { data: dao } = useTeam();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposals', dao?.id],
    getTeamProposals,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}

// Hook (use-infinite-team-proposals.tsx)
export function useInfiniteTeamProposals() {
  const { data: dao } = useTeam();
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
    status,
  } = useInfiniteQuery(['proposals', dao?.id], getTeamProposals, {
    enabled: !!dao,
  });

  return {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
    status,
  };
}
