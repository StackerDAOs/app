import { useQuery } from '@tanstack/react-query';
import { getAccountTransactions } from 'api/clubs';
import { getAccountTransactions as getTeamAccountTransactions } from 'api/teams';

// Hook (use-transactions.tsx)
export function useTransactions(address: string, type: string, filter = 5) {
  const { isFetching, isLoading, isError, data } = useQuery(
    [`${type}-transactions`, address],
    async () => {
      const data = await getAccountTransactions(address, filter);
      return data;
    },
    {
      enabled: !!address,
      refetchInterval: 60000,
    },
  );

  return { isFetching, isLoading, isError, data };
}

// Hook (use-team-transactions.tsx)
export function useTeamTransactions(address: string, type: string, filter = 5) {
  const { isFetching, isLoading, isError, data } = useQuery(
    [`${type}-transactions`, address],
    async () => {
      const data = await getTeamAccountTransactions(address, filter);
      return data;
    },
    {
      enabled: !!address,
      refetchInterval: 60000,
    },
  );

  return { isFetching, isLoading, isError, data };
}
