import React from 'react';
import {
  useMicroStacksClient,
  useStatuses,
  ContractCallParams,
  MicroStacksClient,
  Status,
  StatusKeys,
  TxType,
} from 'ui/components';
import type { FinishedTxData } from 'ui/components';
import { OptionalParams } from './common/types';

interface UseOpenContractCall {
  openContractCall: (
    params: ContractCallParams,
  ) => Promise<FinishedTxData | undefined>;
  isRequestPending: boolean;
}
export const useContractWrite = (
  callbacks?: OptionalParams,
): UseOpenContractCall => {
  const client: MicroStacksClient = useMicroStacksClient();
  const status = useStatuses();
  const openContractCall = React.useCallback(
      (params: ContractCallParams) =>
        client.signTransaction(TxType.ContractCall, {
          ...params,
          onFinish: (payload) => {
            params?.onFinish?.(payload);
            callbacks?.onFinish?.(payload);
          },
          onCancel: (error) => {
            params?.onCancel?.(error);
            callbacks?.onCancel?.(error);
          },
        }),
      [client, callbacks],
    ),
    isRequestPending = React.useMemo(
      () => status[StatusKeys.TransactionSigning] === Status.IsLoading,
      [status],
    );
  return {
    openContractCall,
    isRequestPending,
  };
};
