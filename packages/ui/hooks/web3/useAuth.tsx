// Hook (use-auth.tsx)
import { useQuery } from 'react-query';
import { hexToCV } from 'micro-stacks/clarity';
import { useAccount, useAuth as useMicroStacksAuth } from '@micro-stacks/react';
import { useDAO, useExtension } from 'ui/hooks';
import { getAccountBalances, getTokenId } from 'api/clubs';
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
      let assetIdentifier = '';
      filter(balances?.non_fungible_tokens, (_, key) =>
        getNFTContract(key) === nft?.data?.contract_address
          ? (assetIdentifier = key)
          : '',
      )[0];

      const tokenId = await getTokenId(stxAddress as string, assetIdentifier);
      return {
        isMember: !!assetIdentifier ?? false,
        balances,
        membershipPass: {
          tokenId,
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
