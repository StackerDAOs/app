// Hook (use-team.tsx)
import { useQuery } from 'react-query';
import { getTeam } from 'api/teams';
import { useRouter } from 'next/router';

export function useTeam(daoName?: string | undefined) {
  const router = useRouter();
  const slug = router.query as any;
  const team = slug?.dao ? slug.dao : daoName;

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['team', team],
    async () => {
      return await getTeam(team.toLowerCase());
    },
    {
      enabled: !!team,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
