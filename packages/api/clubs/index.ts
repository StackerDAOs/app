import { supabase } from '../supabase';
import { stacksNetwork } from '../constants';
import {
  fetchContractSource,
  fetchContractEventsById,
  fetchReadOnlyFunction,
  fetchAccountBalances,
  fetchAccountStxBalance,
  fetchFtMetadataForContractId,
  fetchNamesByAddress,
  fetchTransaction,
} from 'micro-stacks/api';
import {
  contractPrincipalCV,
  cvToValue,
  deserializeCV,
  standardPrincipalCV,
  stringAsciiCV,
} from 'micro-stacks/clarity';
import { defaultTo } from 'lodash';
import { pluckSourceCode } from 'utils';

export async function getDAO(name: string) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select(
        'id, name, slug, contract_address, prefix, creator_address, active, config, extensions (contract_address, extension_types (name))',
      )
      .eq('slug', name);
    if (error) throw error;
    return data[0];
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getClubs(creatorAddress: string | undefined) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('id, name, slug, contract_address, prefix')
      .eq('creator_address', creatorAddress);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function generateContractName(organization: any) {
  try {
    const { data: Proposals, error } = await supabase
      .from('proposals')
      .select('contract_address, clubs!inner(id, name, prefix)')
      .eq('clubs.id', organization?.id);
    if (error) throw error;
    if (Proposals.length > 0) {
      const proposalSize = (defaultTo(Proposals?.length, 0) + 1)?.toString();
      const [proposal] = Proposals;
      const targetLength = Proposals?.length + 1 < 1000 ? 3 : 4;
      const contractName = `${
        proposal?.Organizations?.prefix
      }-${proposalSize.padStart(targetLength, '0')}`;
      return contractName;
    } else {
      const contractName = `${organization?.prefix}-001`;
      return contractName;
    }
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getExtension(name: string) {
  try {
    const normalizedName = name.toLowerCase();
    const { data, error } = await supabase
      .from('extension_types')
      .select('id, name')
      .eq('name', normalizedName)
      .limit(1);

    if (error) throw error;
    return data[0]?.name;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getDBProposals({ queryKey }: any) {
  const [_, organizationId, filter] = queryKey;
  const query = supabase
    .from('proposals')
    .select('*, clubs!inner(id, name)')
    .order('created_at', { ascending: false })
    .eq('submitted', true)
    .eq('clubs.id', organizationId);
  try {
    if (filter === 'inactive') {
      const { data: Proposals, error } = await query.filter(
        'submitted',
        'in',
        `("false")`,
      );
      if (error) throw error;
      return Proposals;
    }
    if (filter === 'active') {
      const { data: Proposals, error } = await query
        .filter('submitted', 'in', `("false")`)
        .filter('concluded', 'in', `("false")`);
      if (error) throw error;
      return Proposals;
    }
    if (filter === 'executed') {
      const { data: Proposals, error } = await query.filter(
        'concluded',
        'in',
        `("true")`,
      );
      if (error) throw error;
      return Proposals;
    }
    const { data: Proposals, error } = await query;
    if (error) throw error;
    return Proposals;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getContractProposalByAddress(contractAddress: string) {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('id, contract_address')
      .eq('contract_address', contractAddress)
      .limit(1);
    if (error) throw error;
    return data[0];
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getContractProposalByTx(transactionId: string) {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('id, contract_address')
      .eq('tx_id', transactionId)
      .limit(1);
    if (error) throw error;
    return data[0];
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTokenMetadata(contractId: string) {
  try {
    const network = new stacksNetwork();
    const tokenMetadata = await fetchFtMetadataForContractId({
      url: network.getCoreApiUrl(),
      contractId: contractId,
    });
    return tokenMetadata;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getBns(address: string) {
  try {
    const network = new stacksNetwork();
    const data = await fetchNamesByAddress({
      url: network.getCoreApiUrl(),
      blockchain: 'stacks',
      address: address,
    });
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getAccountBalance(address: string) {
  try {
    const network = new stacksNetwork();
    return await fetchAccountStxBalance({
      url: network.getCoreApiUrl(),
      principal: address,
    });
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getAccountAndBns({ queryKey }: any) {
  const [_, address] = queryKey;
  try {
    const [account, bns] = await Promise.all([
      await getAccountBalance(address),
      await getBns(address),
    ]);
    return { account, bns };
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getVaultBalance(address: string) {
  try {
    const network = new stacksNetwork();
    const balance = await fetchAccountBalances({
      url: network.getCoreApiUrl(),
      principal: address,
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getBalanceOf(vaultAddress: string, assetAddress: string) {
  try {
    const network = new stacksNetwork();
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress: vaultAddress.split('.')[0],
      contractName: vaultAddress.split('.')[1],
      senderAddress: vaultAddress.split('.')[0],
      functionArgs: [standardPrincipalCV(assetAddress)],
      functionName: 'get-balance-of',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTokenBalance(
  address: string,
  contractAddress: string,
) {
  try {
    const network = new stacksNetwork();
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      senderAddress: address,
      functionArgs: [standardPrincipalCV(address)],
      functionName: 'get-balance',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getProposal(
  contractAddress: string,
  proposalAddress: string,
) {
  try {
    const network = new stacksNetwork();
    const proposal: any = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress?.split('.')[0],
      contractName: contractAddress?.split('.')[1],
      senderAddress: contractAddress,
      functionArgs: [
        contractPrincipalCV(
          proposalAddress?.split('.')[0],
          proposalAddress?.split('.')[1],
        ),
      ],
      functionName: 'get-proposal-data',
    });

    const proposalContractAddress = proposalAddress?.split('.')[0];
    const proposalContractName = proposalAddress?.split('.')[1];

    // Fetch the source code for the proposal
    const contractSource = await fetchContractSource({
      url: network.getCoreApiUrl(),
      contract_address: proposalContractAddress,
      contract_name: proposalContractName,
      proof: 0x0,
      tip: '',
    });
    const { source } = contractSource;
    const title = pluckSourceCode(source, 'title');
    const description = pluckSourceCode(source, 'description');
    const type = pluckSourceCode(source, 'type');

    // Fetch quorum threshold for proposals
    const quorumThreshold: any = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress?.split('.')[1],
      senderAddress: contractAddress.split('.')[0],
      functionArgs: [stringAsciiCV('quorumThreshold')],
      functionName: 'get-parameter',
    });

    // Fetch execution delay for executing proposals
    const executionDelay: any = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress?.split('.')[1],
      senderAddress: contractAddress.split('.')[0],
      functionArgs: [stringAsciiCV('executionDelay')],
      functionName: 'get-parameter',
    });
    return {
      contractAddress: proposalAddress,
      title,
      description,
      type,
      proposal,
      quorumThreshold,
      executionDelay,
    };
  } catch (e: any) {
    console.error({ e });
  }
}

type TEvent = {
  extensionAddress: string;
  eventName?: string;
  filterByProposal?: string;
  offset: number;
};

export async function getEvents(
  { extensionAddress, eventName, filterByProposal, offset }: TEvent = {
    extensionAddress: '',
    eventName: undefined,
    filterByProposal: undefined,
    offset: 50,
  },
) {
  try {
    const network = new stacksNetwork();
    const url = network.getCoreApiUrl();
    const data = await fetchContractEventsById({
      url,
      limit: 20,
      contract_id: extensionAddress,
      offset: offset,
      unanchored: false,
    });
    const { results } = data as any;
    const serializedEvents = results.map((event: any) => {
      const hex = event?.contract_log?.value.hex;
      const deserialized = deserializeCV(hex);
      const decoded = cvToValue(deserialized);
      return decoded;
    });

    const filteredEvents =
      eventName && filterByProposal
        ? serializedEvents?.filter(
            (item: any) =>
              item?.event?.value === eventName &&
              item?.proposal?.value === filterByProposal,
          )
        : eventName
        ? serializedEvents?.filter(
            (item: any) => item?.event?.value === eventName,
          )
        : filterByProposal
        ? serializedEvents?.filter(
            (item: any) => item?.proposal?.value === filterByProposal,
          )
        : serializedEvents;

    return filteredEvents;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getParameter(
  contractAddress: string,
  parameterName: string,
) {
  try {
    const network = new stacksNetwork();
    const parameter = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress.split('.')[0],
      contractName: contractAddress.split('.')[1],
      senderAddress: contractAddress,
      functionArgs: [stringAsciiCV(parameterName)],
      functionName: 'get-parameter',
    });
    return parameter;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getContractsToDeploy(
  organizationId: number,
  currentStxAddress: string,
) {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select(
        'id, contract_address, type, tx_id, submitted, disabled, proposed_by, clubs!inner(id, name, prefix)',
      )
      .eq('clubs.id', organizationId)
      .eq('proposed_by', currentStxAddress)
      .eq('submitted', false)
      .eq('disabled', false);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTransaction(transactionId: string) {
  try {
    const network = new stacksNetwork();
    const transaction = await fetchTransaction({
      url: network.getCoreApiUrl(),
      txid: transactionId,
      event_offset: 0,
      event_limit: 1,
    });
    return transaction;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getPostConditions(proposalPrincipal: string) {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('post_conditions')
      .eq('contract_address', proposalPrincipal);
    if (error) throw error;
    if (data) {
      const [postConditions] = data;
      // If postCondition?.asset return postConditions
      // If postConditions?.assetName then...
      // // TODO: Need to fetchReadOnly function to `get-name` of token contract
      return postConditions;
    }
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getProjects() {
  try {
    const { data: clubs, error } = await supabase
      .from('clubs')
      .select('id, name, slug, contract_address');
    if (error) throw error;
    if (clubs.length > 0) {
      return clubs;
    }
  } catch (e: any) {
    console.error({ e });
  }
}

export async function upvoteProposal(id: any) {
  try {
    let { data, error } = await supabase.rpc('upvote', { id });
    console.log({ data });
    if (error) throw error;
    try {
      let { data: proposals, error: proposalsError }: any = await supabase
        .from('proposals')
        .select('upvote')
        .eq('id', id);
      if (proposalsError) throw proposalsError;
      if (proposals.length > 0) {
        return proposals[0];
      }
    } catch (e: any) {
      console.error({ e });
    }
  } catch (e: any) {
    console.error({ e });
  }
}

export async function downvoteProposal(id: any) {
  try {
    let { data, error } = await supabase.rpc('downvote', { id });
    console.log({ data });
    if (error) throw error;
    try {
      let { data: proposals, error: proposalsError }: any = await supabase
        .from('proposals')
        .select('downvote')
        .eq('id', id);
      if (proposalsError) throw proposalsError;
      if (proposals.length > 0) {
        return proposals[0];
      }
    } catch (e: any) {
      console.error({ e });
    }
  } catch (e: any) {
    console.error({ e });
  }
}
