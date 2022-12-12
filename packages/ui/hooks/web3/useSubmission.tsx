import { useQuery } from 'react-query';
import { getSubmission } from 'api/clubs';
import { getSubmission as getTeamSubmission } from 'api/teams';

// Hook (use-submission.tsx)
export function useSubmission(id: number) {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      return await getSubmission(id);
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}

// Hook (use-team-submission.tsx)
export function useTeamSubmission(id: number) {
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['proposal', id],
    async () => {
      return await getTeamSubmission(id);
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
