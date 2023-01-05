import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'ui/components';
import { useDAO, useTeam } from 'ui/hooks';
import { getIdeas } from 'api/clubs';
import { getIdeas as getTeamIdeas } from 'api/teams';

// Hook (use-ideas.tsx)
export function useIdeas(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useDAO();
  const { isFetching, isLoading, isError, data } = useQuery(
    ['ideas', dao?.id, stxAddress, filter],
    getIdeas,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}

// Hook (use-team-ideas.tsx)
export function useTeamIdeas(filter = 'active') {
  const { stxAddress } = useAccount();
  const { data: dao } = useTeam();
  const { isFetching, isLoading, isError, data } = useQuery(
    ['ideas', dao?.id, stxAddress, filter],
    getTeamIdeas,
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}
