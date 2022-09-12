import create from 'zustand';

type ClubInfoType = {
  name: string;
  totalMembers: string;
  threshold: string;
};

type ClubDetailsType = {
  duration: string;
  minimum: string;
};

interface LaunchStore {
  clubInfo: ClubInfoType;
  clubDetails: ClubDetailsType;
  clubMembers: string[];
  updateClub: (data: any, key: string) => void;
}

const initialState = {
  clubInfo: { name: '', totalMembers: '0', threshold: '0' },
  clubDetails: { duration: '', minimum: '0' },
  clubMembers: [],
};

export const useLaunchForm = create<LaunchStore>((set) => ({
  ...initialState,
  updateClub: (data, key) => {
    set((state) => ({
      ...state,
      [key]: data,
    }));
  },
}));
