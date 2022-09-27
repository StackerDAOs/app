// Hook (use-account-balance.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { getAccountAndBns } from 'api/clubs';

export function useAccountBalance() {
  const { stxAddress } = useAccount();
  console.log('vercel env useAccountBalance', process.env.VERCEL);
  const { isFetching, isIdle, isLoading, data } = useQuery(
    ['account-balance', stxAddress],
    getAccountAndBns,
    {
      enabled: !!stxAddress,
    },
  );

  return { isFetching, isIdle, isLoading, data };
}
