// Hook (use-extension.tsx)
import { useQuery } from 'react-query';
import { useDAO } from 'ui/hooks';
import { findExtension } from 'utils';

export function useExtension(name: string) {
  const { data: dao } = useDAO();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    `extension-${name}`,
    () => {
      return findExtension(dao?.extensions, name);
    },
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
