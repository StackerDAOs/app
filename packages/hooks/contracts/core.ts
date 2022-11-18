import {
  uintCV,
  contractPrincipalCV,
  FinishedTxData,
  ContractCallParams,
  MicroStacksClient,
  TxType,
} from 'ui/components';
import { splitContractAddress } from '@stacks-os/utils';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import type { OptionalParams } from '../common/types';

export const core = (
  contract: string,
  client: MicroStacksClient,
  callbacks?: OptionalParams,
) => {
  const [contractAddress, contractName] = splitContractAddress(contract);
  const coreContract: any = {
    label: 'core',
    init: async (proposal: string) => {
      const [proposalAddress, proposalName] = splitContractAddress(proposal);
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
        functionName: 'init',
        functionArgs: [contractPrincipalCV(proposalAddress, proposalName)],
        postConditions: [],
      });
    },
    isExtension: async (extension: string) => {
      const [extensionAddress, extensionName] = splitContractAddress(extension);
      const data = await fetchReadOnlyFunction({
        network: client.getState().network,
        contractAddress,
        contractName,
        senderAddress: contractAddress,
        functionArgs: [contractPrincipalCV(extensionAddress, extensionName)],
        functionName: 'is-extension',
      });
      return data;
    },
  };
  return coreContract;
};
