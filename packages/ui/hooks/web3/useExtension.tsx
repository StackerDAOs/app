import { useQuery } from 'react-query';
import { useDAO, useTeam } from 'ui/hooks';
import { findExtension } from 'utils';

// Hook (use-extension.tsx)
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

// Hook (use-team-extension.tsx)
export function useTeamExtension(name: string) {
  const { data: dao } = useTeam();
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
