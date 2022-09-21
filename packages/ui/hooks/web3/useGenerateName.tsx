// Hook (use-generate-name.tsx)
import { useQuery } from 'react-query';
import { useDAO } from './useDAO';
import { generateContractName } from 'api/clubs';

export function useGenerateName() {
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data }: any = useQuery(
    ['contract-name', dao],
    async () => {
      return await generateContractName(dao);
    },
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
