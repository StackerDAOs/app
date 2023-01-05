import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'ui/components';
import { getAccountAndBns } from 'api/clubs';
import { getAccountAndBns as getTeamAccountAndBns } from 'api/teams';

// Hook (use-account-balance.tsx)
export function useAccountBalance() {
  const { stxAddress } = useAccount();
  const { isFetching, isLoading, data } = useQuery(
    ['account-balance', stxAddress],
    getAccountAndBns,
    {
      enabled: !!stxAddress,
    },
  );

  return { isFetching, isLoading, data };
}

// Hook (use-team-account-balance.tsx)
export function useTeamAccountBalance() {
  const { stxAddress } = useAccount();
  const { isFetching, isLoading, data } = useQuery(
    ['account-balance', stxAddress],
    getTeamAccountAndBns,
    {
      enabled: !!stxAddress,
    },
  );

  return { isFetching, isLoading, data };
}
