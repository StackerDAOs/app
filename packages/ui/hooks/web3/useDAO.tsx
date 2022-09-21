// Hook (use-dao.tsx)
import { useQuery } from 'react-query';
import { getDAO } from 'api/clubs';
import { useRouter } from 'next/router';

export function useDAO() {
  const router = useRouter();
  const { dao } = router.query as any;

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
