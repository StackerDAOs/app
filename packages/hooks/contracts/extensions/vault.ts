import { uintCV, contractPrincipalCV } from 'micro-stacks/clarity';
import { FinishedTxData } from 'micro-stacks/connect';
import {
  ContractCallParams,
  MicroStacksClient,
  TxType,
} from '@micro-stacks/client';
import { splitContractAddress } from '@stacks-os/utils';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import type { OptionalParams } from '../../common/types';

export const vault = (
  contract: string,
  client: MicroStacksClient,
  callbacks?: OptionalParams,
) => {
  const [contractAddress, contractName] = splitContractAddress(contract);
  const vaultContract: any = {
    label: 'vault',
    depositStx: async (amount: number) => {
      const openContractCall = (params: ContractCallParams) =>
        client.signTransaction(TxType.ContractCall, {
          ...params,
          onFinish: (payload: any) => {
            params?.onFinish?.(payload);
            callbacks?.onFinish?.(payload);
          },
          onCancel: (error: any) => {
            params?.onCancel?.(error);
            callbacks?.onCancel?.(error);
          },
        });
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'deposit-stx',
        functionArgs: [uintCV(amount)],
        postConditions: [],
      });
    },
  };
  return vaultContract;
};
