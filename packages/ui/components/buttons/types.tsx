import type { ButtonProps, IconProps, IconButtonProps } from '@chakra-ui/react';

export interface BootstrapProps extends ButtonProps {
  title: string;
  address: string;
}

export interface DeployClubProps extends ButtonProps {
  name: string;
  slug: string;
  onFinish: (data: any) => void;
}

export interface DeployNFTProps extends ButtonProps {
  name: string;
  clubId: number;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeployGovernanceTokenProps extends ButtonProps {
  name: string;
  clubId: number;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeployVaultProps extends ButtonProps {
  name: string;
  clubId: number;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeployICProps extends ButtonProps {
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  governanceTokenContractAddress: string;
  vaultContractAddress: string;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeploySubmissionProps extends ButtonProps {
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  investmentClubContractAddress: string;
  votingContractAddress: string;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeployVotingProps extends ButtonProps {
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  governanceTokenContractAddress: string;
  hasExtension: boolean;
  onFinish: (data: any) => void;
}

export interface DeployBootstrapProps extends ButtonProps {
  name: string;
  slug: string;
  extensions: any[];
  onFinish: (data: any) => void;
}

export interface DeployProposalProps extends ButtonProps {
  organization?: any;
  title: string;
  description: string;
}

export interface ExecuteProposalProps extends ButtonProps {
  proposalPrincipal: string;
  postConditions?: any;
  assetName?: string;
}

export interface VoteProposalProps extends ButtonProps {
  text: string;
  proposalPrincipal: string;
  voteFor: boolean;
}

export interface DepositProps extends ButtonProps {
  title: string;
  amount: string;
}

export interface ProposeProps extends ButtonProps {
  text: string;
  proposalPrincipal: string;
  notDeployer: boolean;
}

export type { ButtonProps, IconProps, IconButtonProps };
