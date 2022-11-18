import type { FinishedTxData } from 'micro-stacks/connect';

export interface OptionalParams {
  onFinish?: (payload: FinishedTxData) => void;
  onCancel?: (error?: string) => void;
}

export interface CoreContract {
  label: string;
  init: (proposal: string) => Promise<void>;
  isExtension: (extension: string) => Promise<unknown>;
}

export interface VaultContract {
  label: string;
  depositStx: (amount: number) => Promise<void>;
}
