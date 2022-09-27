import {
  // StacksMocknet,
  StacksTestnet,
  // StacksMainnet,
} from 'micro-stacks/network';
export const stacksNetwork = StacksTestnet;

export const isMainnet = process.env.STACKS_NETWORK === 'mainnet';
export const isTestnet = process.env.STACKS_NETWORK === 'testnet';
export const isMocknet = process.env.STACKS_NETWORK === 'mocknet';

export const EXECUTOR_DAO_CONTRACT = isMocknet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.executor-dao'
  : 'testnet_contract';
export const STACKS_API_URL = isMocknet
  ? 'http://localhost:3999'
  : 'https://stacks-node-api.testnet.stacks.co';
export const traitPrincipal = isMocknet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD';
export const appDetails = {
  name: 'StackerDAO Labs',
  icon: 'https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png',
};
export const adminAddress = isMocknet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  : 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD' ||
    'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X';
export const vaultAddress = isMocknet
  ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.vault'
  : 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-vault';

export enum EXTENSION_TYPES {
  VAULT = 1,
  NFT_MEMBERSHIP = 2,
  GOVERNANCE_TOKEN = 3,
  INVESTMENT_CLUB = 4,
  SUBMISSION = 5,
  VOTING = 6,
}
