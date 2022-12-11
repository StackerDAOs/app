import { Deployer } from './classes';
import { getClient, TxType, FinishedTxData } from 'ui/components';
import { contractPrincipalCV } from 'ui/components';
import { splitContractAddress } from '@stacks-os/utils';
import type { MicroStacksClient } from 'ui/components';

interface InitInterface {
  proposalAddress: string;
  onFinish?: (payload: FinishedTxData) => void;
  onCancel?: (error?: string) => void;
}

interface ProposeInterface {
  extensionAddress: string;
  proposalAddress: string;
  onFinish?: (payload: FinishedTxData) => void;
  onCancel?: (error?: string) => void;
}

export class StacksSDK {
  public client: MicroStacksClient;
  public coreAddress: string;
  public deployer: Deployer;

  constructor(coreAddress: string) {
    this.client = getClient();
    this.coreAddress = coreAddress;
    this.deployer = new Deployer(coreAddress);
  }

  public getCoreAddress() {
    return this.coreAddress;
  }

  public signIn() {
    this.client.authenticate(); // TODO: Create a class for authorization/account related calls
  }

  public getDeployer() {}

  public init(params: InitInterface) {
    const [contractAddress, contractName] = splitContractAddress(
      this.coreAddress,
    );
    this.client.signTransaction(TxType.ContractCall, {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: 'init',
      functionArgs: [contractPrincipalCV(params?.proposalAddress)],
      postConditions: [],
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  public propose(params: ProposeInterface) {
    const { extensionAddress, proposalAddress } = params;
    const [contractAddress, contractName] =
      splitContractAddress(extensionAddress);
    this.client.signTransaction(TxType.ContractCall, {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: 'propose',
      functionArgs: [contractPrincipalCV(proposalAddress)],
      postConditions: [],
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }

  public submit(params: ProposeInterface) {
    const { extensionAddress, proposalAddress } = params;
    const [contractAddress, contractName] =
      splitContractAddress(extensionAddress);
    this.client.signTransaction(TxType.ContractCall, {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: 'direct-execute',
      functionArgs: [contractPrincipalCV(proposalAddress)],
      postConditions: [],
      onFinish: (payload) => {
        params?.onFinish?.(payload);
      },
      onCancel: (error) => {
        params?.onCancel?.(error);
      },
    });
  }
}
