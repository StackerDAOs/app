import create from 'zustand';
import produce from 'immer';

type SelectTemplateProps = {
  selectedTemplate: string;
  isTransferSelected: boolean;
  isAllowListSelected: boolean;
};

const INITIAL_FORM_DATA: SelectTemplateProps = {
  selectedTemplate: '',
  isTransferSelected: false,
  isAllowListSelected: false,
};

interface GlobalState {
  proposal: SelectTemplateProps;
  handleSelectTemplate: (member: string) => void;
  handleTransferSelected: (isTransferSelected: boolean) => void;
  handleAllowListSelected: (isAllowListSelected: boolean) => void;
}

export const useProposalStore = create<GlobalState>()((set) => ({
  proposal: INITIAL_FORM_DATA,
  handleSelectTemplate: (template: string) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.selectedTemplate = template;
      });
    });
  },
  handleTransferSelected: (isTransferSelected: boolean) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.isTransferSelected = isTransferSelected;
      });
    });
  },
  handleAllowListSelected: (isAllowListSelected: boolean) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.isAllowListSelected = isAllowListSelected;
      });
    });
  },
}));
