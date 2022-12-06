import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type VotingDataProps = {
  hasExecutionDelay: string;
  executionDelayInBlocks: string;
};

const INITIAL_FORM_DATA: VotingDataProps = {
  hasExecutionDelay: 'yes',
  executionDelayInBlocks: '144',
};

interface VotingStore {
  voting: VotingDataProps;
  updateExecutionDelay: (name: string) => void;
  handleEnableExecutionDelay: (hasExecutionDelay: string) => void;
}

export const useVotingStore = create<VotingStore>()(
  devtools(
    persist(
      (set) => ({
        voting: INITIAL_FORM_DATA,
        updateExecutionDelay: (numOfBlocks: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.voting.executionDelayInBlocks = numOfBlocks;
            });
          });
        },
        handleEnableExecutionDelay: (hasExecutionDelay: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.voting.hasExecutionDelay = hasExecutionDelay;
            });
          });
        },
      }),
      {
        name: 'club-voting-store',
      },
    ),
  ),
);
