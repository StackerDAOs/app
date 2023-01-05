// Hook (use-transaction.tsx)
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransaction } from 'api/clubs';

export function useTransaction(transactionId: string) {
  const [interval, setInterval] = React.useState(100000);
  const { isFetching, isLoading, isError, data } = useQuery(
    ['transaction', transactionId],
    async () => {
      const data = await getTransaction(transactionId);
      if (data.tx_status === 'success') {
        setInterval(0);
      }
      return data;
    },
    {
      enabled: !!transactionId,
      refetchInterval: interval,
      refetchOnMount: true,
    },
  );

  return { isFetching, isLoading, isError, data };
}
