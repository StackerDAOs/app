// Hook (use-auth.tsx)
import { useQuery } from 'react-query';
import { useAccount, useAuth as useMicroStacksAuth } from '@micro-stacks/react';
import { useDAO, useExtension } from 'ui/hooks';
import { getAccountBalances } from 'api/clubs';
import { filter, map } from 'lodash';

const getNFTContract = (nftIdentifier: string) => {
  return nftIdentifier.split('::')[0];
};

export function useAuth() {
  const { data: dao } = useDAO();
  const { stxAddress } = useAccount();
  const nft = useExtension('NFT Membership');
  const submission = useExtension('Submission');
  const voting = useExtension('Voting');
  const { isSignedIn } = useMicroStacksAuth();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['auth', stxAddress],
    async () => {
      const balances = await getAccountBalances(stxAddress as string);
      const hasNft = filter(
        balances?.non_fungible_tokens,
        (_, key) => getNFTContract(key) === nft?.data?.contract_address,
      )[0];
      console.log({ hasNft });
      return {
        isMember: !!hasNft ?? false,
        balances,
        membershipPass: {
          tokenId: hasNft,
          contractAddress: nft?.data?.contract_address,
        },
      };
    },
    {
      enabled: !!stxAddress && !!nft?.data,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
