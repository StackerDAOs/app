import React from 'react';
import { useMicroStacksClient } from '@micro-stacks/react';
import { MicroStacksClient } from '@micro-stacks/client';
import { contracts } from './contracts';
import { OptionalParams } from './common/types';

const getContract = (
  contract: string,
  template: string,
  client: MicroStacksClient,
  callbacks?: OptionalParams,
) => {
  return contracts[template as keyof typeof contracts](
    contract,
    client,
    callbacks,
  );
};

export const useContract = (
  contract: string,
  template: string,
  callbacks?: OptionalParams,
) => {
  const client: MicroStacksClient = useMicroStacksClient();
  const currentContract = React.useMemo(() => {
    return getContract(contract, template, client, callbacks);
  }, [contract, template]);

  if (!currentContract) {
    throw new Error('Contract not found');
  }

  return currentContract;
};
