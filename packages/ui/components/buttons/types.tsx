import type { ButtonProps, IconProps, IconButtonProps } from '@chakra-ui/react';

export interface BootstrapProps extends ButtonProps {
  title: string;
  contractPrincipal: string;
  bootstrapPrincipal: string;
  onSubmit?: (data: any) => void;
}

export interface DeployClubProps extends ButtonProps {
  name: string;
  slug: string;
  config: {
    description: string;
    tokenSymbol: string;
    nftMembershipPass: string;
    memberAddresses: string[];
    durationInDays: string;
    minimumDeposit: string;
  };
  onDeploy: (data: any) => void;
}

export interface DeployNFTProps extends ButtonProps {
  coreDao: string;
  name: string;
  clubId: number;
  hasExtension: boolean;
  onDeploy: (data: any) => void;
}

export interface DeployGovernanceTokenProps extends ButtonProps {
  coreDao: string;
  name: string;
  symbol: string;
  clubId: number;
  hasExtension: boolean;
  onDeploy: (data: any) => void;
}

export interface DeployVaultProps extends ButtonProps {
  coreDao: string;
  name: string;
  clubId: number;
  hasExtension: boolean;
  onDeploy: (data: any) => void;
}

export interface DeployICProps extends ButtonProps {
  coreDao: string;
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  governanceTokenContractAddress: string;
  vaultContractAddress: string;
  hasExtension: boolean;
  startWindow: string;
  minimumDeposit: string;
  onDeploy: (data: any) => void;
}

export interface DeploySubmissionProps extends ButtonProps {
  coreDao: string;
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  investmentClubContractAddress: string;
  votingContractAddress: string;
  hasExtension: boolean;
  onDeploy: (data: any) => void;
}

export interface DeployVotingProps extends ButtonProps {
  coreDao: string;
  name: string;
  clubId: number;
  nftMembershipContractAddress: string;
  governanceTokenContractAddress: string;
  hasExtension: boolean;
  onDeploy: (data: any) => void;
}

export interface DeployBootstrapProps extends ButtonProps {
  coreDao: string;
  name: string;
  slug: string;
  extensions: any[];
  memberAddresses: string[];
  onDeploy: (data: any) => void;
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
  investmentClubAddress: string;
}

export interface ProposeProps extends ButtonProps {
  text: string;
  proposalPrincipal: string;
  notDeployer: boolean;
}

export type { ButtonProps, IconProps, IconButtonProps };
