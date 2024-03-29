import { supabase } from '../../supabase';
import { useMutation, useQueryClient } from 'react-query';

type Team = {
  name: string;
  contract_address: string;
  creator_address: string | undefined;
  slug: string;
  type_id: number;
  config?: {
    members: string[];
  };
  tx_id: string;
};

type Submission = {
  title: string;
  description: string;
  body: string;
  contract_address: string;
  tx_id: string;
  submitted_by: string;
  team_id: number;
  post_conditions?: {
    type: string;
    from: string;
    amount?: number;
    asset?: string;
    assetIdentifier?: string;
    decimals?: number;
  };
};

type Proposal = {
  contract_address: string;
  tx_id: string;
  proposed_by: string;
};

export async function createTeam({
  team,
  userAddress,
}: {
  team: Team;
  userAddress: string;
}) {
  try {
    const { data, error } = await supabase.from('teams').insert([{ ...team }]);
    if (error) throw error;
    const newTeam = data[0];
    const { data: _, error: usersTeamsError } = await supabase
      .from('users_teams')
      .insert({ team_id: newTeam.id, user_address: userAddress });
    if (usersTeamsError) throw usersTeamsError;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation(createTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('team');
      queryClient.invalidateQueries('teams');
    },
  });
};

export async function updateBootrapAddress(team: {
  contract_address?: string;
  bootstrap_address?: string;
  bootstrap_tx_id?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('teams')
      .update({
        bootstrap_address: team.bootstrap_address,
        bootstrap_tx_id: team.bootstrap_tx_id,
      })
      .match({
        contract_address: team.contract_address,
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
      queryClient.invalidateQueries('team');
      queryClient.invalidateQueries('teams');
    },
  });
};

export async function updateInitTxId(team: {
  contract_address?: string;
  activation_tx_id?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('teams')
      .update({ activation_tx_id: team.activation_tx_id })
      .match({
        contract_address: team.contract_address,
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
      queryClient.invalidateQueries('team');
      queryClient.invalidateQueries('teams');
    },
  });
};

export async function activateTeam(team: { contract_address?: string }) {
  try {
    const { data, error } = await supabase
      .from('teams')
      .update({ active: true })
      .match({
        contract_address: team.contract_address,
      });
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useActivateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation(activateTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('team');
      queryClient.invalidateQueries('teams');
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
    const newProposal = await supabase
      .from('proposals')
      .insert([{ ...proposal }]);
    if (newProposal.error) throw newProposal.error;
    const submission = await supabase
      .from('submissions')
      .update({ deployed: true })
      .match({
        contract_address: proposal.contract_address,
      });
    if (submission.error) throw submission.error;
    return {
      proposal: newProposal.data,
      submission: submission.data,
    };
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation(createProposal, {
    onSuccess: () => {
      queryClient.invalidateQueries('proposals');
      queryClient.invalidateQueries('submissions');
    },
  });
};
