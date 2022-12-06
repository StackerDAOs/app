import { getClient, TxType, ContractDeployParams } from 'ui/components';
import { kebabCase, replace, upperCase } from 'lodash';
import {
  clubExtension,
  clubMembershipExtension,
  governanceTokenExtension,
  submissionExtension,
  bootstrapProposal,
  transferStxProposal,
  upgradeProtocolProposal,
  upgradeAllowedAssetsProposal,
  vaultExtension,
  votingExtension,
} from 'utils/contracts';
import type { MicroStacksClient, FinishedTxData } from 'ui/components';
import type {
  ClubParams,
  ClubMembershipPassParams,
  ClubGovernanceTokenParams,
  SubmissionParams,
  VaultParams,
  VotingParams,
  TransferStxParams,
  UpgradeProtocolParams,
  UpgradeAllowedAssetsParams,
  ClubBootstrapParams,
} from '../../common';

/**
 * Deploy StackerDAO extensions & proposals to the Stacks blockchain.
 * @public
 */
export class Deployer {
  public client: MicroStacksClient;
  public coreAddress: string;

  constructor(coreAddress: string) {
    this.client = getClient();
    this.coreAddress = coreAddress;
  }

  /**
   * Deploys a Club Membership Pass extension to the Stacks blockchain.
   *
   * @remarks Deploys a Club Membership Pass extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployMembershipPass({
   *   contractName: "club-membership-pass",,
   *   tokenName: "StackerDAO Club",
   * });
   * ```
   * @param params - the parameters for the Club Membership Pass extension
   *
   * @example
   * ```javascript
   * {
   *   contractName: "club-membership-pass",
   *   tokenName: "StackerDAO Club",
   * }
   * ```
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployMembershipPass(
    params: ClubMembershipPassParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName } = params;
    const normalizeTokenName = kebabCase(params?.tokenName);
    const codeBody = clubMembershipExtension(
      normalizeTokenName,
      this.coreAddress,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Club Governance Token extension to the Stacks blockchain.
   *
   * @remarks Deploys a Club Governance Token extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployGovernanceToken({
   *   contractName: "club-governance-token",,
   *   tokenName: "StackerDAO Club",
   *   tokenSymbol: "STACK",
   * });
   * ```
   * @param params - the parameters for the Club Governance Token extension
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployGovernanceToken(
    params: ClubGovernanceTokenParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName, tokenUri } = params;
    const normalizeTokenName = kebabCase(params?.tokenName);
    const normalizeTokenSymbol = upperCase(
      replace(params?.tokenSymbol, ' ', ''),
    );
    const codeBody = governanceTokenExtension(
      normalizeTokenName,
      normalizeTokenSymbol,
      tokenUri,
      this.coreAddress,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Club Vault extension to the Stacks blockchain.
   *
   * @remarks Deploys a Vault extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployVault();
   * ```
   *
   * @param params - the parameters for the Club Vault extension
   * ```javascript
   * interface VaultParams {
   *  contractName: string;
   *  requireAllowList?: boolean;
   *  includeSendMany?: boolean;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployVault(
    params: VaultParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName } = params;
    const codeBody = vaultExtension(this.coreAddress);
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Club extension to the Stacks blockchain.
   *
   * @remarks Deploys a Club extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployClub({
   *  contractName: "investment-club",
   *  membershipPassAddress: "club-membership-pass",
   *  governanceTokenAddress: "club-governance-token",
   *  vaultAddress: "club-vault",
   *  fundraisingDurationInBlocks: 144,
   *  minimumDepositAmount: 1000000,
   * fundraiseGoal: 1500
   * });
   * ```
   *
   * @param params - the parameters for the Club extension
   * ```javascript
   * interface ClubParams {
   *  contractName: string;
   *  membershipPassAddress: string;
   *  governanceTokenAddress: string;
   *  vaultAddress: string;
   *  fundraisingDurationInBlocks: number;
   *  minimumDepositAmount?: number;
   * fundraiseGoal?: number;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployClub(
    params: ClubParams,
  ): Promise<FinishedTxData | undefined> {
    const {
      contractName,
      membershipPassAddress,
      governanceTokenAddress,
      vaultAddress,
      fundraisingDurationInBlocks,
      minimumDepositAmount,
      fundraiseGoal,
    } = params;
    const codeBody = clubExtension(
      membershipPassAddress,
      governanceTokenAddress,
      vaultAddress,
      fundraisingDurationInBlocks,
      minimumDepositAmount,
      fundraiseGoal,
      this.coreAddress,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Club Proposal Submission extension to the Stacks blockchain.
   *
   * @remarks Deploys a Club Proposal Submission extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deploySubmission({
   *  contractName: "club-submission",
   *  membershipPassAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.club-membership-pass",
   *  clubAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.investment-club",
   *  votingAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.club-voting",
   *  proposalDurationInBlocks: 144,
   *  minimumProposalStartDelay: 144,
   *  maximumProposalStartDelay: 1000000,
   * });
   * ```
   *
   * @param params - the parameters for the Club Proposal Submission extension
   * ```javascript
   * interface SubmissionParams {
   *  contractName: string;
   *  membershipPassAddress: string;
   *  clubAddress: string;
   *  votingAddress: string;
   *  proposalDurationInBlocks: number;
   *  minimumProposalStartDelay: number;
   *  maximumProposalStartDelay: number;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deploySubmission(
    params: SubmissionParams,
  ): Promise<FinishedTxData | undefined> {
    const {
      contractName,
      membershipPassAddress,
      clubAddress,
      votingAddress,
      proposalDurationInBlocks,
      minimumProposalStartDelay,
      maximumProposalStartDelay,
    } = params;
    const codeBody = submissionExtension(
      membershipPassAddress,
      clubAddress,
      votingAddress,
      proposalDurationInBlocks,
      minimumProposalStartDelay,
      maximumProposalStartDelay,
      this.coreAddress,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Club Voting extension to the Stacks blockchain.
   *
   * @remarks Deploys a Club Voting extension and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployVoting({
   *  contractName: "club-voting",
   *  membershipPassAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.club-membership-pass",
   *  governanceTokenAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.governance-token",
   *  executionDelay: 144,
   * });
   * ```
   *
   * @param params - the parameters for the Club Voting extension
   * ```javascript
   * interface VotingParams {
   *  contractName: string;
   *  membershipPassAddress: string;
   *  governanceTokenAddress: string;
   *  executionDelay?: number;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployVoting(
    params: VotingParams,
  ): Promise<FinishedTxData | undefined> {
    const {
      contractName,
      membershipPassAddress,
      governanceTokenAddress,
      executionDelay,
    } = params;
    const codeBody = votingExtension(
      membershipPassAddress,
      governanceTokenAddress,
      executionDelay,
      this.coreAddress,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /** ------------------------------------------------------------------------------------------------------------------
   *   Bootstrap Proposals
   *  ------------------------------------------------------------------------------------------------------------------
   */

  /**
   * Deploys a Bootstrap Proposal for Clubs to the Stacks blockchain.
   *
   * @remarks Deploys a Bootstrap Proposal and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployBootstrap({
   *  contractName: "transfer-funds",
   *  extensions: {
   *   vaultContract: string;
   *   governanceTokenContract: string;
   *   nftMembershipContract: string;
   *   investmentClubContract: string;
   *   submissionContract: string;
   *   votingContract: string;
   *   },
   *  members: ['SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S', 'SP4WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S'],
   *  allowlist: ['SP123.miami-coin', 'SP123.miami-coin'],
   * });
   * ```
   *
   * @param params - the parameters for the Transfer STX Proposal
   * ```javascript
   * interface ClubBootstrapParams {
   *  contractName: string;
   *  extensions: BootstrapExtensions;
   *  members?: string[];
   *  allowlist?: string[];
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployBootstrap(
    params: ClubBootstrapParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName, extensions, members, allowlist } = params;
    const codeBody = bootstrapProposal(
      this.coreAddress,
      extensions,
      members,
      allowlist,
    );
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /** ------------------------------------------------------------------------------------------------------------------
   *   Proposals
   *  ------------------------------------------------------------------------------------------------------------------
   */

  /**
   * Deploys a Transfer STX Proposal to the Stacks blockchain.
   *
   * @remarks Deploys a Transfer STX Proposal and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployTransferStx({
   *  contractName: "transfer-funds",
   *  from: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.vault",
   *  to: ['ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM','ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50'],
   *  amount: 1500,
   * });
   * ```
   *
   * @param params - the parameters for the Transfer STX Proposal
   * ```javascript
   * interface TransferStxParams {
   *  contractName: string;
   *  from: string;
   *  to: string[];
   *  amount: number;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployTransferStx(
    params: TransferStxParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName, from, to, amount } = params;
    const codeBody = transferStxProposal(from, to, amount);
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Protocol Upgrade Proposal to the Stacks blockchain.
   *
   * @remarks Deploys a Protocol Upgrade Proposal and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployProtocolUpgrade({
   *  contractName: "protocol-upgrade",
   *  clubExtension: { contractAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.club", fundraisingDurationInBlocks: 420 },
   *  submissionExtension: { contractAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.submission", proposalDuration: 1440 },
   *  votingExtension: { contractAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.voting", executionDelay: 0 },
   * });
   * ```
   *
   * @param params - the parameters for the Protocol Upgrade Proposal
   * ```javascript
   * interface UpgradeProtocolParams {
   *  contractName: string;
   *  enabledExtensions?: string[];
   *  disabledExtensions?: string[];
   *  clubExtension?: UpgradeClubExtensionParams;
   *  submissionExtension?: UpgradeSubmissionExtensionParams;
   *  votingExtension?: UpgradeVotingExtensionParams;
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployProtocolUpgrade(
    params: UpgradeProtocolParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName, onFinish, onCancel, ...rest } = params;
    const codeBody = upgradeProtocolProposal({
      ...rest,
      coreAddress: this.coreAddress,
    });
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  /**
   * Deploys a Protocol Upgrade Proposal to the Stacks blockchain.
   *
   * @remarks Deploys a Protocol Upgrade Proposal and returns the tx data of the deployed contract
   *
   * @example
   * ```javascript
   * const contractAddress = await sdk.deployer.deployAllowListUpgrade({
   *  contractName: "allow-list-upgrade",
   *  vaultAddress: "SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.vault",
   *  allowed: ["SP3WV3VC6GM1WF215SDHP0MESQ3BNXHB1N6TPB70S.miamicoin"],
   * });
   * ```
   *
   * @param params - the parameters for the Protocol Upgrade Proposal
   * ```javascript
   * interface upgradeAllowedAssetsProposal {
   *  contractName: string;
   *  vaultAddress: string;
   *  allowed?: string[];
   *  disabled?: string[];
   *  onFinish?: (payload: FinishedTxData) => void;
   *  onCancel?: (error?: string) => void;
   * }
   * ```
   *
   * @returns the txId and txRaw of the deployed contract
   */
  public async deployAllowListUpgrade(
    params: UpgradeAllowedAssetsParams,
  ): Promise<FinishedTxData | undefined> {
    const { contractName, onFinish, onCancel, ...rest } = params;
    const codeBody = upgradeAllowedAssetsProposal({
      ...rest,
    });
    return this.openContractCallDeploy({
      contractName,
      codeBody,
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  private async openContractCallDeploy(params: ContractDeployParams) {
    return await this.client.signTransaction(TxType.ContractDeploy, params);
  }
}
