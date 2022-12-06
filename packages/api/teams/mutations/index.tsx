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
