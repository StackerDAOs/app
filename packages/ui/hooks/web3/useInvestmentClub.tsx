// Hook (use-investment-club.tsx)
import { useQuery } from 'react-query';
import { useDAO, useExtension, useGovernanceToken } from 'ui/hooks';
import { getDAO, getFundingRound } from 'api/clubs';
import { splitContractAddress } from '@stacks-os/utils';

// {
//   contractAddress: string,
//   contractName: string,
//   isRaising: bool,
//   currentRound: {
//   id: number,
//   closesAt: number,
//   raisedAmount: number,
//   }
//   minimumDeposit: number,
//   durationInBlocks: number,
//   members: string[],
//   }

export function useInvestmentClub() {
  const dao = useDAO();
  const club = useExtension('Investment Club');
  const governanceToken = useGovernanceToken();
  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['investment-club', club?.data?.contract_address],
    async () => {
      const [contractAddress, contractName] = splitContractAddress(
        club?.data?.contract_address,
      );
      const fundingRound = await getFundingRound(
        club?.data?.contract_address,
        '1',
      );
      return {
        contractAddress,
        contractName,
        isRaising: true,
        currentRound: {
          id: 1,
          closesAt: Number(fundingRound?.closesAt),
          fundingGoal: Number(fundingRound?.cap),
          raisedAmount: Number(fundingRound?.raised),
        },
        minimumDeposit: 100,
        durationInBlocks: 100,
      };
    },
    {
      enabled: !!club?.data?.contract_address,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
