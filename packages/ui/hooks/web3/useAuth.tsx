// Hook (use-auth.tsx)
import React from 'react';
import { useQuery } from 'react-query';
import { useAccount, useAuth as useMicroStacksAuth } from '@micro-stacks/react';
import { useExtension } from 'ui/hooks';
import { getAccountBalances, getTokenId } from 'api/clubs';
import { filter } from 'lodash';

const getNFTContract = (nftIdentifier: string) => {
  return nftIdentifier.split('::')[0];
};

export function useAuth() {
  const [interval, setInterval] = React.useState(1000);
  const { stxAddress } = useAccount();
  const nft = useExtension('NFT Membership');
  const { isSignedIn } = useMicroStacksAuth();

  const { isFetching, isIdle, isLoading, isError, data } = useQuery(
    ['auth', stxAddress],
    async () => {
      const balances = await getAccountBalances(stxAddress as string);
      let assetIdentifier = `${nft?.data?.contract_address}::${
        nft?.data?.contract_address.split('.')[1]
      }`;
      const tokenId = (await getTokenId(
        stxAddress as string,
        assetIdentifier,
      )) as number;
      if (tokenId > 0) {
        setInterval(0);
      }
      return {
        isMember: !!assetIdentifier ?? false,
        balances,
        membershipPass: {
          tokenId,
          assetIdentifier,
          contractAddress: nft?.data?.contract_address,
        },
      };
    },
    {
      enabled: !!stxAddress && !!nft?.data,
      refetchInterval: interval,
    },
  );

  return { isFetching, isIdle, isLoading, isError, data };
}
