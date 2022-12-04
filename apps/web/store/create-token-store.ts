import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type ClubTokenProps = {
  name: string;
  symbol: string;
  tokenUri: string;
  isTransferrable: string;
};

const INITIAL_FORM_DATA: ClubTokenProps = {
  name: '',
  symbol: '',
  tokenUri: 'NA',
  isTransferrable: 'no',
};

interface ClubTokenStore {
  token: ClubTokenProps;
  updateName: (name: string) => void;
  updateSymbol: (symbol: string) => void;
  updateTokenUri: (supply: string) => void;
  handleSelectTransferrable: (isTransferrable: string) => void;
}

export const useClubTokenStore = create<ClubTokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: INITIAL_FORM_DATA,
        updateName: (name: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.token.name = name;
            });
          });
        },
        updateSymbol: (symbol: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.token.symbol = symbol;
            });
          });
        },
        updateTokenUri: (tokenUri: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.token.tokenUri = tokenUri;
            });
          });
        },
        handleSelectTransferrable: (isTransferrable: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.token.isTransferrable = isTransferrable;
            });
          });
        },
      }),
      {
        name: 'club-token-storage',
      },
    ),
  ),
);
