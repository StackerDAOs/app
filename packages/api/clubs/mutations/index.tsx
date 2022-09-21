import { supabase } from '../../supabase';
import { useMutation, useQueryClient } from 'react-query';

type Club = {
  name: string;
  contract_address: string;
  creator_address: string | undefined;
  slug: string;
  type: number;
};

export async function createClub(club: Club) {
  try {
    const { data, error } = await supabase.from('clubs').insert([{ ...club }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateClub = () => {
  const queryClient = useQueryClient();
  return useMutation(createClub, {
    onSuccess: () => {
      queryClient.invalidateQueries('clubs');
    },
  });
};

export async function updateBootrapAddress(club: {
  contract_address?: string;
  bootstrap_address?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ bootstrap_address: club.bootstrap_address })
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
      queryClient.invalidateQueries('clubs');
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
