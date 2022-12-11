import create from 'zustand';
import produce from 'immer';

type Recipient = {
  to: string;
  amount: string;
};

type SelectTemplateProps = {
  selectedTemplate: string;
  isTransferSelected: boolean;
  isAllowListSelected: boolean;
  recipientDetails: {
    to: string;
    amount: string;
  };
  tokenAddress: string;
  recipients: Recipient[];
  allowlist: string[];
};

const INITIAL_FORM_DATA: SelectTemplateProps = {
  selectedTemplate: '',
  isTransferSelected: false,
  isAllowListSelected: false,
  recipientDetails: {
    to: '',
    amount: '',
  },
  tokenAddress: '',
  recipients: [],
  allowlist: [],
};

interface SelectProposalStore {
  proposal: SelectTemplateProps;
  handleSelectTemplate: (member: string) => void;
  handleTransferSelected: (isTransferSelected: boolean) => void;
  handleAllowListSelected: (isAllowListSelected: boolean) => void;
  updateTransferObject: (params: { to: string; amount: string }) => void;
  addRecipient: (recipient: { to: string; amount: string }) => void;
  updateTokenAddress: (tokenAddress: string) => void;
  addToken: (tokenAddress: string) => void;
}

export const useProposalStore = create<SelectProposalStore>()((set) => ({
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
  updateTransferObject: ({ to, amount }: { to: string; amount: string }) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.recipientDetails.to = to;
        draft.proposal.recipientDetails.amount = amount;
      });
    });
  },
  addRecipient: (recipient: { to: string; amount: string }) => {
    set(
      produce((draft) => {
        draft.proposal.recipients.push(recipient);
        draft.proposal.recipientDetails.to = '';
        draft.proposal.recipientDetails.amount = '';
      }),
    );
  },
  updateTokenAddress: (tokenAddress: string) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.tokenAddress = tokenAddress;
      });
    });
  },
  addToken: (tokenAddress: string) => {
    set(
      produce((draft) => {
        draft.proposal.allowlist.push(tokenAddress);
        draft.proposal.tokenAddress = '';
      }),
    );
  },
}));
