// Hook (use-team.tsx)
import { useQuery } from '@tanstack/react-query';
import { getTeam } from 'api/teams';
import { useRouter } from 'next/router';

export function useTeam(daoName?: string | undefined) {
  const router = useRouter();
  const slug = router.query as any;
  const team = slug?.dao ? slug.dao : daoName;

  const { isFetching, isLoading, isError, data } = useQuery(
    ['team', team],
    async () => {
      return await getTeam(team.toLowerCase());
    },
    {
      enabled: !!team,
    },
  );

  return { isFetching, isLoading, isError, data };
}
