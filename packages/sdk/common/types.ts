import type { FinishedTxData } from 'ui/components';

export type BootstrapExtensions = {
  vaultContract: string;
  governanceTokenContract: string;
  nftMembershipContract: string;
  investmentClubContract: string;
  submissionContract: string;
  votingContract: string;
};

export type Recipient = {
  to: string;
  amount: string;
};

export type BootstrapTeamExtensions = {
  vaultContract: string;
  multisigContract: string;
};

export interface ContractCallParams {
  onFinish?: (payload: FinishedTxData) => void;
  onCancel?: (error?: string) => void;
}

export interface ClubMembershipPassParams extends ContractCallParams {
  contractName: string;
  tokenName: string;
}

export interface ClubGovernanceTokenParams extends ContractCallParams {
  contractName: string;
  tokenName: string;
  tokenSymbol: string;
  tokenUri?: string | undefined;
}

export interface VaultParams extends ContractCallParams {
  contractName: string;
  requireAllowList?: boolean;
  includeSendMany?: boolean;
}

export interface ClubParams extends ContractCallParams {
  contractName: string;
  membershipPassAddress: string;
  governanceTokenAddress: string;
  vaultAddress: string;
  fundraisingDurationInBlocks: number;
  minimumDepositAmount?: number;
  fundraiseGoal?: number;
}

export interface SubmissionParams extends ContractCallParams {
  contractName: string;
  membershipPassAddress: string;
  clubAddress: string;
  votingAddress: string;
  proposalDurationInBlocks?: number;
  minimumProposalStartDelay?: number;
  maximumProposalStartDelay?: number;
}

export interface VotingParams extends ContractCallParams {
  contractName: string;
  membershipPassAddress: string;
  governanceTokenAddress: string;
  executionDelay?: number;
}

export interface MultisigParams extends ContractCallParams {
  contractName: string;
}

export interface ClubBootstrapParams extends ContractCallParams {
  contractName: string;
  extensions: BootstrapExtensions;
  members?: string[];
  allowlist?: string[];
}

export interface TeamBootstrapParams extends ContractCallParams {
  contractName: string;
  extensions: BootstrapTeamExtensions;
  signalsRequired?: number;
  members?: string[];
  allowlist?: string[];
}

export interface TransferStxParams extends ContractCallParams {
  contractName: string;
  from: string;
  to: string;
  amount: number;
}

export interface UpgradeClubExtensionParams extends ContractCallParams {
  contractAddress: string;
  fundraisingDurationInBlocks?: number;
  minimumDepositAmount?: number;
}

export interface UpgradeSubmissionExtensionParams extends ContractCallParams {
  contractAddress: string;
  proposalDurationInBlocks?: number;
  minimumProposalStartDelay?: number;
  maximumProposalStartDelay?: number;
}

export interface UpgradeVotingExtensionParams extends ContractCallParams {
  contractAddress: string;
  executionDelay?: number;
}

export interface UpgradeProtocolParams extends ContractCallParams {
  contractName: string;
  enabledExtensions?: string[];
  disabledExtensions?: string[];
  clubExtension?: UpgradeClubExtensionParams;
  submissionExtension?: UpgradeSubmissionExtensionParams;
  votingExtension?: UpgradeVotingExtensionParams;
}

export interface UpgradeAllowedAssetsParams extends ContractCallParams {
  contractName: string;
  vaultAddress: string;
  allowed?: string[];
  disabled?: string[];
}

export interface VaultTemplateParams extends ContractCallParams {
  contractName: string;
  vaultAddress: string;
  recipients?: Recipient[];
  allowlist?: string[];
}
