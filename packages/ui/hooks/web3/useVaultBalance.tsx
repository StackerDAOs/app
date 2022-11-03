// Hook (use-vault-balance.tsx)
import { useQuery } from 'react-query';
import { useExtension } from 'ui/hooks';
import { getVaultBalance } from 'api/clubs';

export function useVaultBalance() {
  const { data: vault } = useExtension('Vault');
  console.log({ vault });

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    'vault-balance',
    async () => {
      return await getVaultBalance(vault?.contract_address);
    },
    {
      enabled: !!vault?.contract_address,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
