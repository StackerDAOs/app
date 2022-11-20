import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type ClubMembershipPassProps = {
  name: string;
  symbol: string;
  maxSupply: string;
  isTransferrable: string;
};

const INITIAL_FORM_DATA: ClubMembershipPassProps = {
  name: '',
  symbol: '',
  maxSupply: '99',
  isTransferrable: 'yes',
};

interface ClubMembershipPassStore {
  membershipPass: ClubMembershipPassProps;
  updateName: (name: string) => void;
  updateSymbol: (symbol: string) => void;
  updateMaxSupply: (supply: string) => void;
  handleSelectTransferrable: (isTransferrable: string) => void;
}

export const useClubMembershipPass = create<ClubMembershipPassStore>()(
  devtools(
    persist(
      (set) => ({
        membershipPass: INITIAL_FORM_DATA,
        updateName: (name: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.membershipPass.name = name;
            });
          });
        },
        updateSymbol: (symbol: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.membershipPass.symbol = symbol;
            });
          });
        },
        updateMaxSupply: (newSupply: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.membershipPass.maxSupply = newSupply;
            });
          });
        },
        handleSelectTransferrable: (isTransferrable: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.membershipPass.isTransferrable = isTransferrable;
            });
          });
        },
      }),
      {
        name: 'club-membership-pass-storage',
      },
    ),
  ),
);
