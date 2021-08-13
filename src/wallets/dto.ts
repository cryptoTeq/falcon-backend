import { Utils } from '../utils';
import { EnrichedAsset } from '../assets/asset.entity';
import { Wallet } from './entity/wallet.entity';
import { WalletAsset } from './entity/walletAsset.entity';
import { WalletTransaction } from './entity/walletTransaction.entity';

export class TransferReq {
  fromWallet: Wallet;
  toWallet: Wallet;
  enrichedAsset: EnrichedAsset;
  size: string;
  saveTransaction: boolean;

  constructor(
    fWallet: Wallet,
    tWallet: Wallet,
    eAsset: EnrichedAsset,
    size: string,
    saveTx: boolean = true,
  ) {
    this.enrichedAsset = eAsset;
    this.fromWallet = fWallet;
    this.saveTransaction = saveTx;
    this.size = size;
    this.toWallet = tWallet;
  }

  totalValueUsd = () => {
    return Utils.multiply(this.enrichedAsset.assetValueUsd, this.size);
  };
}

export class TransferResult {
  walletAsset: WalletAsset;
  enrichedAsset: EnrichedAsset;
  transaction: WalletTransaction;
  transactionSaved: boolean;
  transferSuccess: boolean;
  transferMessage: string;
  constructor(success: boolean, msg?: string) {
    this.transferSuccess = success;
    this.transferMessage = msg;
  }
}

export class ConversionResult {}
