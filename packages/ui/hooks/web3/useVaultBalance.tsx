import { useQuery } from 'react-query';
import { useExtension, useTeamExtension } from 'ui/hooks';
import { getVaultBalance } from 'api/clubs';
import { getVaultBalance as getTeamVaultBalance } from 'api/teams';

// Hook (use-vault-balance.tsx)
export function useVaultBalance() {
  const { data: vault } = useExtension('Vault');

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

// Hook (use-team-vault-balance.tsx)
export function useTeamVaultBalance() {
  const { data: vault } = useTeamExtension('Vault');

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    'vault-balance',
    async () => {
      return await getTeamVaultBalance(vault?.contract_address);
    },
    {
      enabled: !!vault?.contract_address,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
