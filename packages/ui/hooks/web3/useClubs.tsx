// Hook (use-clubs.tsx)
import { useQuery } from 'react-query';
import { useAccount } from 'ui/components';
import { getUserClubs } from 'api/clubs';

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
