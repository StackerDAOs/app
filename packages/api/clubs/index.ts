import { supabase } from '../supabase';
import { stacksNetwork } from '../constants';
import {
  fetchContractSource,
  fetchContractEventsById,
  fetchReadOnlyFunction,
  fetchAccountBalances,
  fetchAccountAssets,
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
  uintCV,
  hexToCV,
} from 'micro-stacks/clarity';
import { defaultTo } from 'lodash';
import { splitContractAddress } from '@stacks-os/utils';
import { pluckSourceCode } from 'utils';

export async function getDAO(name: string) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select(
        'id, name, slug, contract_address, prefix, creator_address, bootstrap_address, active, tx_id, bootstrap_tx_id, activation_tx_id, config, extensions (contract_address, tx_id, extension_types (name))',
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
    if (Proposals?.length > 0) {
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

export async function getSubmissions({ queryKey }: any) {
  const [_, organizationId, stxAddress, filter] = queryKey;
  const query = supabase
    .from('submissions')
    .select('*, clubs!inner(id, name)')
    .order('created_at', { ascending: false })
    .eq('clubs.id', organizationId)
    .eq('submitted_by', stxAddress);
  try {
    if (filter === 'active') {
      const { data: submissions, error } = await query.filter(
        'disabled',
        'in',
        `("false")`,
      );
      if (error) throw error;
      return submissions;
    }
    const { data: submissions, error } = await query;
    if (error) throw error;
    return submissions;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getIdeas({ queryKey }: any) {
  const [_, organizationId, stxAddress, filter] = queryKey;
  const query = supabase
    .from('ideas')
    .select('*, clubs!inner(id, name)')
    .order('created_at', { ascending: false })
    .eq('clubs.id', organizationId)
    .eq('submitted_by', stxAddress);
  try {
    if (filter === 'active') {
      const { data: ideas, error } = await query.filter(
        'disabled',
        'in',
        `("false")`,
      );
      if (error) throw error;
      return ideas;
    }
    const { data: ideas, error } = await query;
    if (error) throw error;
    return ideas;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getProposals({ queryKey }: any) {
  const [_, organizationId] = queryKey;
  const query = supabase
    .from('proposals')
    .select(
      '*, submission:submissions!inner(id, title, description, body, club_id)',
    )
    .order('created_at', { ascending: false })
    .eq('submissions.club_id', organizationId);
  try {
    const { data: proposals, error } = await query;
    if (error) throw error;
    return proposals;
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

export async function getAccountBalances(address: string) {
  try {
    const network = new stacksNetwork();
    const balance = await fetchAccountBalances({
      url: network.getCoreApiUrl(),
      principal: address as string,
    });
    return balance;
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

export async function getAccountStxBalance(address: string) {
  try {
    const network = new stacksNetwork();
    return await fetchAccountStxBalance({
      url: network.getCoreApiUrl(),
      principal: address as string,
    });
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getAccountAndBns({ queryKey }: any) {
  const [_, address] = queryKey;
  try {
    const [account, bns] = await Promise.all([
      await getAccountStxBalance(address),
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

export async function getBalance(
  stxAddress: string | undefined,
  principalAddress: string,
) {
  try {
    const network = new stacksNetwork();
    const [contractAddress, contractName] =
      splitContractAddress(principalAddress);
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: stxAddress as string,
      functionArgs: [standardPrincipalCV(stxAddress as string)],
      functionName: 'get-balance',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getDecimal(principalAddress: string) {
  try {
    const network = new stacksNetwork();
    const [contractAddress, contractName] =
      splitContractAddress(principalAddress);
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: contractAddress,
      functionArgs: [],
      functionName: 'get-decimals',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getSymbol(principalAddress: string) {
  try {
    const network = new stacksNetwork();
    const [contractAddress, contractName] =
      splitContractAddress(principalAddress);
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: contractAddress,
      functionArgs: [],
      functionName: 'get-symbol',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTotalSupply(principalAddress: string) {
  try {
    const network = new stacksNetwork();
    const [contractAddress, contractName] =
      splitContractAddress(principalAddress);
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: contractAddress,
      functionArgs: [],
      functionName: 'get-total-supply',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTokenData({ queryKey }: any) {
  const [_, principalAddress] = queryKey;
  try {
    const [symbol, totalSupply] = await Promise.all([
      await getSymbol(principalAddress),
      await getTotalSupply(principalAddress),
    ]);
    return { symbol, totalSupply };
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

export async function getFundingRound(
  contractPrincipal: string,
  roundId: string,
) {
  try {
    const network = new stacksNetwork();
    const [contractAddress, contractName] =
      splitContractAddress(contractPrincipal);
    const balance: any = await fetchReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      senderAddress: contractAddress,
      functionArgs: [uintCV(roundId)],
      functionName: 'get-round',
    });
    return balance;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getTokenId(principal: string, assetIdentifier: string) {
  try {
    const network = new stacksNetwork();
    const fetchTokenId = await fetch(
      `${network.getCoreApiUrl()}/extended/v1/tokens/nft/holdings?principal=${principal}&asset_identifiers[]=${assetIdentifier}&limit=1`,
      {},
    );
    const response = await fetchTokenId.json();
    if (response?.results?.length > 0) {
      const token = hexToCV(response?.results[0]?.value?.hex) as {
        type: number;
        value: any;
      };
      return Number(token?.value);
    }

    return 0;
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getProposal(
  contractAddress: string,
  proposalAddress: string,
) {
  const [proposalContractAddress, proposalContractName] =
    splitContractAddress(proposalAddress);
  try {
    const network = new stacksNetwork();
    const proposal: any = await fetchReadOnlyFunction({
      network,
      contractAddress: contractAddress?.split('.')[0],
      contractName: contractAddress?.split('.')[1],
      senderAddress: contractAddress,
      functionArgs: [
        contractPrincipalCV(proposalContractAddress, proposalContractName),
      ],
      functionName: 'get-proposal-data',
    });

    const { data, error } = await supabase
      .from('proposals')
      .select(
        '*, submission:submissions!inner(id, title, description, body, club_id)',
      )
      .order('created_at', { ascending: false })
      .eq('submissions.contract_address', proposalAddress);
    if (error) throw error;

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
      details: data[0],
      info: proposal,
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
    if (clubs?.length > 0) {
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
      if (proposals?.length > 0) {
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
      if (proposals?.length > 0) {
        return proposals[0];
      }
    } catch (e: any) {
      console.error({ e });
    }
  } catch (e: any) {
    console.error({ e });
  }
}

export async function getUserClubs(address: string | undefined) {
  try {
    const { data: clubs, error } = await supabase
      .from('users_clubs')
      .select(
        'user_address, club_id, club:clubs!inner(id, name, slug, contract_address)',
      )
      .eq('user_address', address);
    if (error) throw error;
    if (clubs?.length > 0) {
      return clubs;
    }
    return [];
  } catch (e: any) {
    console.error({ e });
  }
}
