import { useQuery } from '@tanstack/react-query';
import { getSubmission } from 'api/clubs';
import { getSubmission as getTeamSubmission } from 'api/teams';

// Hook (use-submission.tsx)
export function useSubmission(id: number) {
  const { isFetching, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      return await getSubmission(id);
    },
  );

  return { isFetching, isLoading, isError, data };
}

// Hook (use-team-submission.tsx)
export function useTeamSubmission(id: number) {
  const { isFetching, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      return await getTeamSubmission(id);
    },
  );

  return { isFetching, isLoading, isError, data };
}
