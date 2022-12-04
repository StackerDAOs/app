import { supabase } from '../../../supabase';
import { useMutation, useQueryClient } from 'react-query';

type Extension = {
  club_id: number;
  contract_address: string;
  extension_type_id: number;
  tx_id: string;
  config?: {
    allowed_tokens: string[];
  };
};

export async function createExtension(extension: Extension) {
  try {
    const { data, error } = await supabase
      .from('extensions')
      .insert([{ ...extension }]);
    if (error) throw error;
    return data;
  } catch (e: any) {
    console.error({ e });
  }
}

export const useCreateExtension = () => {
  const queryClient = useQueryClient();
  return useMutation(createExtension, {
    onSuccess: () => {
      queryClient.invalidateQueries('extensions');
      queryClient.invalidateQueries('dao');
    },
  });
};
