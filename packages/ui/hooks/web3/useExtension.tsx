import { useQuery } from '@tanstack/react-query';
import { useDAO, useTeam } from 'ui/hooks';
import { findExtension } from 'utils';

// Hook (use-extension.tsx)
export function useExtension(name: string) {
  const { data: dao } = useDAO();
  const { isFetching, isLoading, isError, data } = useQuery(
    [`extension-${name}`],
    () => {
      return findExtension(dao?.extensions, name);
    },
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}

// Hook (use-team-extension.tsx)
export function useTeamExtension(name: string) {
  const { data: dao } = useTeam();
  const { isFetching, isLoading, isError, data } = useQuery(
    [`extension-${name}`],
    () => {
      return findExtension(dao?.extensions, name);
    },
    {
      enabled: !!dao,
    },
  );

  return { isFetching, isLoading, isError, data };
}
