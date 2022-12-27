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
  isSetThresholdSelected: boolean;
  recipientDetails: {
    to: string;
    amount: string;
  };
  tokenAddress: string;
  recipients: Recipient[];
  allowlist: string[];
  addedMemberDetails: string;
  membersToAdd: string[];
  removedMemberDetails: string;
  membersToRemove: string[];
  signatureThreshold: string;
  data: {
    title: string;
    description: string;
    body: string;
  };
};

const INITIAL_FORM_DATA: SelectTemplateProps = {
  selectedTemplate: '',
  isTransferSelected: true,
  isAllowListSelected: false,
  isSetThresholdSelected: false,
  recipientDetails: {
    to: '',
    amount: '',
  },
  tokenAddress: '',
  recipients: [],
  allowlist: [],
  addedMemberDetails: '',
  membersToAdd: [],
  removedMemberDetails: '',
  membersToRemove: [],
  signatureThreshold: '',
  data: {
    title: '',
    description: '',
    body: '',
  },
};

interface SelectProposalStore {
  proposal: SelectTemplateProps;
  handleSelectTemplate: (member: string) => void;
  handleTransferSelected: (isTransferSelected: boolean) => void;
  handleAllowListSelected: (isAllowListSelected: boolean) => void;
  handleSetThresholdSelected: (isSetThresholdSelected: boolean) => void;
  updateTransferObject: (params: { to: string; amount: string }) => void;
  addRecipient: (recipient: { to: string; amount: string }) => void;
  addMember: (member: string) => void;
  addRemovedMember: (member: string) => void;
  removeMember: (member: string) => void;
  removeRemovedMember: (member: string) => void;
  updateAddedMember: (member: string) => void;
  updateTokenAddress: (tokenAddress: string) => void;
  updateSignatureThreshold: (threshold: string) => void;
  addToken: (tokenAddress: string) => void;
  updateProposalData: (data: {
    title: string;
    description: string;
    body: string;
  }) => void;
  clearRecipients: () => void;
  clearAllowlist: () => void;
  clearAddedMembers: () => void;
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
  handleSetThresholdSelected: (isSetThresholdSelected: boolean) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.isSetThresholdSelected = isSetThresholdSelected;
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
  addMember: (member: string) => {
    set(
      produce((draft) => {
        draft.proposal.membersToAdd.push(member);
        draft.proposal.addedMemberDetails = '';
      }),
    );
  },
  removeMember: (member: string) => {
    set(
      produce((draft) => {
        draft.proposal.membersToAdd = draft.proposal.membersToAdd.filter(
          (m: string) => m !== member,
        );
      }),
    );
  },
  addRemovedMember: (member: string) => {
    set(
      produce((draft) => {
        draft.proposal.membersToRemove.push(member);
        draft.proposal.removedMemberDetails = '';
      }),
    );
  },
  removeRemovedMember: (member: string) => {
    set(
      produce((draft) => {
        draft.proposal.membersToRemove = draft.proposal.membersToRemove.filter(
          (m: string) => m !== member,
        );
      }),
    );
  },
  updateAddedMember: (member: string) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.addedMemberDetails = member;
      });
    });
  },
  updateTokenAddress: (tokenAddress: string) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.tokenAddress = tokenAddress;
      });
    });
  },
  updateSignatureThreshold: (threshold: string) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.signatureThreshold = threshold;
      });
    });
  },
  updateProposalData: (data: {
    title: string;
    description: string;
    body: string;
  }) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.proposal.data.title = data.title;
        draft.proposal.data.description = data.description;
        draft.proposal.data.body = data.body;
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
  clearRecipients: () => {
    set(
      produce((draft) => {
        draft.proposal.recipients = [];
      }),
    );
  },
  clearAllowlist: () => {
    set(
      produce((draft) => {
        draft.proposal.allowlist = [];
      }),
    );
  },
  clearAddedMembers: () => {
    set(
      produce((draft) => {
        draft.proposal.membersToAdd = [];
      }),
    );
  },
}));
