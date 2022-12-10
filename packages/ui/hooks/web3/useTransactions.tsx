import { useQuery } from 'react-query';
import { getAccountTransactions } from 'api/clubs';
import { getAccountTransactions as getTeamAccountTransactions } from 'api/teams';

// Hook (use-transactions.tsx)
export function useTransactions(address: string, type: string) {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    [`${type}-transactions`, address],
    async () => {
      const data = await getAccountTransactions(address);
      return data;
    },
    {
      enabled: !!address,
      refetchInterval: 60000,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}

// Hook (use-team-transactions.tsx)
export function useTeamTransactions(address: string, type: string) {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    [`${type}-transactions`, address],
    async () => {
      const data = await getTeamAccountTransactions(address);
      return data;
    },
    {
      enabled: !!address,
      refetchInterval: 60000,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
