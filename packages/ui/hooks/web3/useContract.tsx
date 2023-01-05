// Hook (use-contract.tsx)
import { useQuery } from '@tanstack/react-query';
import { useOpenContractCall } from '@micro-stacks/react';
import { contractPrincipalCV, uintCV, boolCV } from 'micro-stacks/clarity';
import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stacksNetwork } from 'api/constants';
import { useAccount } from 'ui/components';
import { splitContractAddress } from '@stacks-os/utils';

const findContract = ({
  contract,
  templateName,
  mutate,
  readOnly,
  caller,
}: any) => {
  const [contractAddress, contractName] = splitContractAddress(contract);
  const contracts: any = {
    core: {
      init: async (proposal: string) => {
        const [proposalAddress, proposalName] = splitContractAddress(proposal);
        await mutate({
          contractAddress,
          contractName,
          functionName: 'init',
          functionArgs: [contractPrincipalCV(proposalAddress, proposalName)],
          postConditions: [],
          onFinish: (data: any) => {
            console.log({ data });
          },
        });
      },
      isExtension: async (extension: string) => {
        const network = new stacksNetwork();
        const [extensionAddress, extensionName] =
          splitContractAddress(extension);
        const data = await readOnly({
          network,
          contractAddress,
          contractName,
          senderAddress: caller,
          functionArgs: [contractPrincipalCV(extensionAddress, extensionName)],
          functionName: 'is-extension',
        });
        return data;
      },
    },
    submission: {
      propose: async (
        proposal: string,
        duration: number,
        tokenId: number,
        onFinish?: (data?: any) => void,
        onCancel?: (data?: any) => void,
      ) => {
        const [proposalAddress, proposalName] = splitContractAddress(proposal);
        await mutate({
          contractAddress,
          contractName,
          functionName: 'propose',
          functionArgs: [
            contractPrincipalCV(proposalAddress, proposalName),
            uintCV(duration),
            uintCV(tokenId),
          ],
          postConditions: [],
          onFinish,
          onCancel,
        });
      },
    },
    voting: {
      vote: async (
        decision: boolean,
        proposal: string,
        tokenId: number,
        onFinish?: (data?: any) => void,
        onCancel?: (data?: any) => void,
      ) => {
        const [proposalAddress, proposalName] = splitContractAddress(proposal);
        await mutate({
          contractAddress,
          contractName,
          functionName: 'vote',
          functionArgs: [
            boolCV(decision),
            contractPrincipalCV(proposalAddress, proposalName),
            uintCV(tokenId),
          ],
          postConditions: [],
          onFinish,
          onCancel,
        });
      },
    },
  };

  return contracts[templateName];
};

const getContract = (
  contract: string,
  templateName: string,
  { mutate, readOnly }: any,
  caller: string | undefined,
) => {
  const params = { contract, templateName, mutate, readOnly, caller };
  const currentContract = findContract(params);
  return currentContract;
};

export function useContract(contract: string, templateName: string) {
  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();
  const fetch = () =>
    getContract(
      contract,
      templateName,
      {
        mutate: openContractCall,
        readOnly: fetchReadOnlyFunction,
      },
      stxAddress,
    );
  const { isFetching, isLoading, isError, data } = useQuery(
    ['contract', contract, templateName],
    fetch,
  );

  return { isFetching, isLoading, isError, ...data };
}
