import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type VaultProps = {
  hasAllowList: string;
  listOfAllowedTokens: string[];
};

const INITIAL_FORM_DATA: VaultProps = {
  hasAllowList: 'yes',
  listOfAllowedTokens: [],
};

interface VaultStore {
  vault: VaultProps;
  addAllowedToken: (token: string) => void;
  removeAllowedToken: (token: string) => void;
  handleSelectAllowList: (isTransferrable: string) => void;
}

export const useVaultStore = create<VaultStore>()(
  devtools(
    persist(
      (set) => ({
        vault: INITIAL_FORM_DATA,
        addAllowedToken: (token: string) => {
          set(
            produce((draft) => {
              draft.vault.listOfAllowedTokens.push(token);
            }),
          );
        },
        removeAllowedToken: (member) => {
          set(
            produce((draft) => {
              draft.vault.listOfAllowedTokens =
                draft.vault.listOfAllowedTokens.filter(
                  (m: string) => m !== member,
                );
            }),
          );
        },
        handleSelectAllowList: (hasAllowList: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.vault.hasAllowList = hasAllowList;
            });
          });
        },
      }),
      {
        name: 'club-vault-storage',
      },
    ),
  ),
);
