import type { ButtonProps } from 'ui';

export interface DepositProps extends ButtonProps {
  title: string;
  amount: string;
  vaultAddress: string;
}
