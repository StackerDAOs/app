import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type SubmissionDataProps = {
  proposalDuration: string;
  minimumProposalStartDelay: string;
  maximumProposalStartDelay: string;
};

const INITIAL_FORM_DATA: SubmissionDataProps = {
  proposalDuration: '144',
  minimumProposalStartDelay: '0',
  maximumProposalStartDelay: '0',
};

interface VotingStore {
  submission: SubmissionDataProps;
  updateProposalDuration: (name: string) => void;
  updateMinimumStartDelay: (name: string) => void;
  updateMaximumStartDelay: (name: string) => void;
}

export const useSubmissionStore = create<VotingStore>()(
  devtools(
    persist(
      (set) => ({
        submission: INITIAL_FORM_DATA,
        updateProposalDuration: (duration: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.submission.proposalDuration = duration;
            });
          });
        },
        updateMinimumStartDelay: (minStartDelay: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.submission.minimumProposalStartDelay = minStartDelay;
            });
          });
        },
        updateMaximumStartDelay: (maxStartDelay: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.submission.maximumProposalStartDelay = maxStartDelay;
            });
          });
        },
      }),
      {
        name: 'club-submission-store',
      },
    ),
  ),
);
