import { TransactionStatus } from './entity/walletTransaction.entity';

export interface TransactionFilters {
  walletId: number;
  assetId?: number;
  status?: TransactionStatus;
}
