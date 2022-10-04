// Hook (use-governance-token.tsx)
import { useQuery } from 'react-query';
import { useAccount } from '@micro-stacks/react';
import { useExtension } from 'ui/hooks';
import { getBalance, getSymbol, getTotalSupply } from 'api/clubs';
import { splitContractAddress } from '@stacks-os/utils';

export function useGovernanceToken() {
  const { stxAddress } = useAccount();
  const { data: governanceToken } = useExtension('Governance Token');

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['governance-token', `${governanceToken?.contract_address}`, stxAddress],
    async () => {
      const [address, name] = splitContractAddress(
        governanceToken?.contract_address,
      );
      const balance = await getBalance(
        stxAddress,
        governanceToken?.contract_address,
      );
      const symbol = await getSymbol(governanceToken?.contract_address);
      const totalSupply = await getTotalSupply(
        governanceToken?.contract_address,
      );
      return { address, name, symbol, totalSupply, balance };
    },
    {
      enabled: !!governanceToken?.contract_address,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}