import { TransactionStatus } from './entity/walletTransaction.entity';

export interface TransactionFilters {
  walletId: number;
  fromAssetId?: number;
  toAssetId?: number;
  status?: TransactionStatus;
}
