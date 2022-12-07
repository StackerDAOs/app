import { supabase } from '../../supabase';
import { useMutation, useQueryClient } from 'react-query';

type Club = {
  name: string;
  contract_address: string;
  creator_address: string | undefined;
  slug: string;
  type_id: number;
  config?: {
    description: string;
    tokenSymbol: string;
    nftMembershipPass: string;
    memberAddresses: string[];
    durationInDays: string;
    minimumDeposit: string;
  };
  tx_id: string;
};

type Proposal = {
  contract_address: string;
  tx_id: string;
  proposed_by: string;
};

type Idea = {
  title: string;
  description: string;
  body: string;
  submitted_by: string;
  club_id: string;
};

type Submission = {
  title: string;
  description: string;
  body: string;
  contract_address: string;
  tx_id: string;
  submitted_by: string;
  club_id: string;
  post_conditions: object;
};

type Vote = {
  idea_id: string | string[] | undefined;
  direction: number;
  user_address: string;
};

export async function createClub({
  club,
  userAddress,
}: {
  club: Club;
  userAddress: string;
}) {
  try {
    const { data, error } = await supabase.from('clubs').insert([{ ...club }]);
    if (error) throw error;
    const newClub = data[0];
    const { data: _, error: usersClubsError } = await supabase
      .from('users_clubs')
      .insert({ club_id: newClub.id, user_address: userAddress });
    if (usersClubsError) throw usersClubsError;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateClub = () => {
  const queryClient = useQueryClient();
  return useMutation(createClub, {
    onSuccess: () => {
      queryClient.invalidateQueries('dao');
      queryClient.invalidateQueries('clubs');
    },
  });
};

export async function updateClub(club: {
  contract_address: string;
  config: any;
}) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ config: club.config })
      .match({
        contract_address: club.contract_address,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useUpdateClub = () => {
  const queryClient = useQueryClient();
  return useMutation(updateClub, {
    onSuccess: () => {
      queryClient.invalidateQueries('dao');
      queryClient.invalidateQueries('clubs');
      queryClient.invalidateQueries('investment-club');
    },
  });
};

export async function updateBootrapAddress(club: {
  contract_address?: string;
  bootstrap_address?: string;
  bootstrap_tx_id?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({
        bootstrap_address: club.bootstrap_address,
        bootstrap_tx_id: club.bootstrap_tx_id,
      })
      .match({
        contract_address: club.contract_address,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useUpdateBootstrap = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBootrapAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries('dao');
      queryClient.invalidateQueries('clubs');
      queryClient.invalidateQueries('investment-club');
    },
  });
};

export async function updateInitTxId(club: {
  contract_address?: string;
  activation_tx_id?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ activation_tx_id: club.activation_tx_id })
      .match({
        contract_address: club.contract_address,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useUpdateInitTxId = () => {
  const queryClient = useQueryClient();
  return useMutation(updateInitTxId, {
    onSuccess: () => {
      queryClient.invalidateQueries('dao');
      queryClient.invalidateQueries('clubs');
      queryClient.invalidateQueries('investment-club');
    },
  });
};

export async function activateClub(club: { contract_address?: string }) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ active: true })
      .match({
        contract_address: club.contract_address,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useActivateClub = () => {
  const queryClient = useQueryClient();
  return useMutation(activateClub, {
    onSuccess: () => {
      queryClient.invalidateQueries('clubs');
    },
  });
};

export async function createIdea(idea: Idea) {
  try {
    const { data, error } = await supabase.from('ideas').insert([{ ...idea }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation(createIdea, {
    onSuccess: () => {
      queryClient.invalidateQueries('ideas');
    },
  });
};

export async function createSubmission(submission: Submission) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert([{ ...submission }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubmission, {
    onSuccess: () => {
      queryClient.invalidateQueries('submissions');
    },
  });
};

export async function createProposal(proposal: Proposal) {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .insert([{ ...proposal }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(createProposal, {
    onSuccess: () => {
      queryClient.invalidateQueries('proposals');
    },
  });
};

export async function handleIdeaVote(vote: Vote) {
  try {
    const { data, error } = await supabase.from('votes').insert([{ ...vote }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useIdeaVote = () => {
  const queryClient = useQueryClient();
  return useMutation(handleIdeaVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('ideas');
    },
  });
};

export async function handleUpdateIdeaVote(vote: Vote) {
  try {
    const { data, error } = await supabase
      .from('votes')
      .update({ direction: vote.direction })
      .eq('idea_id', vote.idea_id);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useUpdateIdeaVote = () => {
  const queryClient = useQueryClient();
  return useMutation(handleUpdateIdeaVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('ideas');
    },
  });
};
