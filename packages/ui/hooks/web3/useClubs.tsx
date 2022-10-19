// Hook (use-clubs.tsx)
import { useQuery } from 'react-query';
import { getClubs, getUserClubs } from 'api/clubs';
import { useAccount } from '@micro-stacks/react';

export function useClubs() {
  const { stxAddress } = useAccount();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['clubs', stxAddress],
    async () => {
      return await getUserClubs(stxAddress);
    },
    {
      enabled: !!stxAddress,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
