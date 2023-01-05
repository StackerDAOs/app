// Hook (use-auth.tsx)
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useAuth as useMicroStacksAuth } from 'ui/components';
import { useExtension, useTeamExtension } from 'ui/hooks';
import { getAccountBalances, getTokenId } from 'api/clubs';
import { getApprover, getSignalsRequired } from 'api/teams';

export function useAuth() {
  const [interval, setInterval] = React.useState(1000);
  const { stxAddress } = useAccount();
  const nft = useExtension('NFT Membership');
  const { isSignedIn } = useMicroStacksAuth();

  const { isFetching, isLoading, isError, refetch, data } = useQuery(
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

  return { isFetching, isLoading, isError, refetch, data };
}

export function useTeamAuth() {
  const { stxAddress } = useAccount();
  const multisig = useTeamExtension('Team');

  const { isFetching, isLoading, isError, refetch, data } = useQuery(
    ['auth', stxAddress],
    async () => {
      const isMember = await getApprover(
        stxAddress as string,
        multisig?.data?.contract_address,
      );
      const signalsRequired = await getSignalsRequired(
        multisig?.data?.contract_address,
      );

      return {
        isMember,
        signalsRequired: Number(signalsRequired),
      };
    },
    {
      enabled: !!stxAddress && !!multisig?.data,
    },
  );

  return { isFetching, isLoading, isError, refetch, data };
}
