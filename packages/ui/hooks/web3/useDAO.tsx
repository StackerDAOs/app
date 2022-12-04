// Hook (use-dao.tsx)
import { useQuery } from 'react-query';
import { getDAO } from 'api/clubs';
import { useRouter } from 'next/router';

export function useDAO(daoName?: string | undefined) {
  const router = useRouter();
  const slug = router.query as any;
  const dao = slug?.dao ? slug.dao : daoName;

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['dao', dao],
    async () => {
      return await getDAO(dao.toLowerCase());
    },
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
