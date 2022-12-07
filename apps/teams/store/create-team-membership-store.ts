import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type TeamMembershipProps = {
  signalsRequired: string;
  member: string;
  members: string[];
};

const INITIAL_FORM_DATA: TeamMembershipProps = {
  signalsRequired: '1',
  member: '',
  members: [],
};

interface TeamMembershipStore {
  team: TeamMembershipProps;
  updateSignalsRequired: (signalsRequired: string) => void;
  addMember: (member: string) => void;
  removeMember: (member: string) => void;
}

export const useTeamMembershipStore = create<TeamMembershipStore>()(
  devtools(
    persist(
      (set) => ({
        team: INITIAL_FORM_DATA,
        updateSignalsRequired: (signals: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.team.signalsRequired = signals;
            });
          });
        },
        addMember: (member: string) => {
          set(
            produce((draft) => {
              draft.team.members.push(member);
            }),
          );
        },
        removeMember: (member) => {
          set(
            produce((draft) => {
              draft.team.members = draft.team.members.filter(
                (m: string) => m !== member,
              );
            }),
          );
        },
      }),
      {
        name: 'team-membership-storage',
      },
    ),
  ),
);
