import {
  StacksMainnet,
  StacksTestnet,
  StacksMocknet,
} from 'micro-stacks/network';

export const isMainnet = process.env.STACKS_NETWORK === 'mainnet';
export const isTestnet = process.env.STACKS_NETWORK === 'testnet';
export const isMocknet = process.env.STACKS_NETWORK === 'mocknet';
console.log('STACKS_NETWORK', process.env.STACKS_NETWORK);

export const stacksNetwork = isMainnet
  ? StacksMainnet
  : isTestnet
  ? StacksTestnet
  : StacksMocknet;

export const traitPrincipal = isMainnet
  ? 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD'
  : isTestnet
  ? 'STX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z1G9JXRF'
  : 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export const appDetails = {
  name: 'StackerDAO Labs',
  icon: 'https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png',
};

export enum CLUB_EXTENSION_TYPES {
  VAULT = 1,
  NFT_MEMBERSHIP = 2,
  GOVERNANCE_TOKEN = 3,
  INVESTMENT_CLUB = 4,
  SUBMISSION = 5,
  VOTING = 6,
}

export enum CLUB_TYPES {
  INVESTMENT_CLUB = 1,
  IMPACT_CLUB = 2,
}
