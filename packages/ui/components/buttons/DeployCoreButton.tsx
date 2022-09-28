import React from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useAccount, useOpenContractDeploy } from '@micro-stacks/react';
import { coreDAO } from 'utils/contracts';
import { useCreateClub } from 'api/clubs/mutations';
import { DeployClubProps } from 'ui/components/buttons/types';
import { CLUB_TYPES } from 'api/constants';

export const DeployCoreButton = (props: DeployClubProps) => {
  const { openContractDeploy } = useOpenContractDeploy();
  const { stxAddress } = useAccount();
  const createClub = useCreateClub();

  const deployCoreDAO = React.useCallback(async () => {
    const onFinish: any = async (data: any) => {
      try {
        createClub.mutate({
          name: props?.name,
          slug: props?.slug,
          type_id: CLUB_TYPES.INVESTMENT_CLUB,
          contract_address: `${stxAddress}.${props?.slug}`,
          creator_address: stxAddress,
          config: props?.config,
        });
        props?.onFinish(data);
      } catch (e: any) {
        console.error({ e });
      }
    };

    const codeBody = coreDAO();
    await openContractDeploy({
      contractName: `${props?.slug}`,
      codeBody,
      onFinish,
    });
  }, [props]);

  return (
    <Button
      {...props}
      onClick={deployCoreDAO}
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 1 }}
    >
      {props?.title || 'Deploy'}
    </Button>
  );
};
