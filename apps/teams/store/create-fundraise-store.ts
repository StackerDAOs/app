import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type FundraiseProps = {
  minimumDeposit: string;
  durationInDays: string;
  hasMultipleRoundsEnabled: string;
  fundraiseGoalAmount: string;
};

const INITIAL_FORM_DATA: FundraiseProps = {
  minimumDeposit: '0',
  durationInDays: '1',
  hasMultipleRoundsEnabled: 'yes',
  fundraiseGoalAmount: '',
};

interface FundraiseStore {
  minimumDeposit: string;
  durationInDays: string;
  hasMultipleRoundsEnabled: string;
  fundraiseGoalAmount: string;
  updateMinimumDeposit: (token: string) => void;
  updateDurationInDays: (token: string) => void;
  updateFundraiseAmount: (amount: string) => void;
  handleEnableMultipleRounds: (enabled: string) => void;
}

export const useFundraiseStore = create<FundraiseStore>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_FORM_DATA,
        updateMinimumDeposit: (depositAmount: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.minimumDeposit = depositAmount;
            });
          });
        },
        updateDurationInDays: (duration: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.durationInDays = duration;
            });
          });
        },
        updateFundraiseAmount: (amount: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.fundraiseGoalAmount = amount;
            });
          });
        },
        handleEnableMultipleRounds: (enabled: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.hasMultipleRoundsEnabled = enabled;
            });
          });
        },
      }),
      {
        name: 'club-fundraise-storage',
      },
    ),
  ),
);
