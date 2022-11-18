import { Deployer } from './classes';
import { getClient } from '@micro-stacks/client';
import type { MicroStacksClient } from '@micro-stacks/client';

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
}
