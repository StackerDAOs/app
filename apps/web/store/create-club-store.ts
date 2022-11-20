import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type OnboardFormData = {
  name: string;
  description: string;
  member: string;
  members: string[];
  durationInDays: number;
  minimumDeposit: number;
};

const INITIAL_FORM_DATA: OnboardFormData = {
  name: '',
  description: '',
  member: '',
  members: [],
  durationInDays: 1,
  minimumDeposit: 0,
};

interface GlobalState {
  club: OnboardFormData;
  updateName: (name: string) => void;
  addMember: (member: string) => void;
  removeMember: (member: string) => void;
}

export const useGlobalState = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        club: INITIAL_FORM_DATA,
        updateName: (name: string) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.club.name = name;
            });
          });
        },
        addMember: (member: string) => {
          set(
            produce((draft) => {
              draft.club.members.push(member);
            }),
          );
        },
        removeMember: (member) => {
          set(
            produce((draft) => {
              draft.club.members = draft.club.members.filter(
                (m: string) => m !== member,
              );
            }),
          );
        },
      }),
      {
        name: 'global-storage',
      },
    ),
  ),
);
