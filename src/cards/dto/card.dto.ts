import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { Asset, EnrichedAsset } from 'src/assets/asset.entity';
import { Wallet } from 'src/wallets/entity/wallet.entity';
import { WalletTransaction } from 'src/wallets/entity/walletTransaction.entity';
import { Card } from '../card.entity';

export class CardDepositReqDto {
  @AutoMap()
  @IsString()
  qrCode: string;

  @AutoMap()
  @IsString()
  deviceId: string;

  @AutoMap()
  @IsString() //long,lat
  location: string;
}

//TODO: combine with CardGenerationRequest

export enum CardBill {
  CAD_5 = '5',
  CAD_10 = '10',
  CAD_20 = '20',
  CAD_50 = '50',
  CAD_100 = '100',
}

export class CardGenReqItem {
  constructor(bType: CardBill, q: number) {
    this.cardBillType = bType;
    this.quantity = q;
  }
  cardBillType: CardBill;
  quantity: number;
}

export class CardGenerationReq {
  //TODO: should be peristed. Only Admin can generate card - Look CardGenerationRequest entity
  fromWallet: Wallet;
  toWallet: Wallet;
  cardBills: CardGenReqItem[];
  totalAmount: number;
  enrichedAsset: EnrichedAsset;

  constructor(
    cbills: CardGenReqItem[],
    tAmount: number,
    asset: EnrichedAsset,
    fWallet: Wallet,
    tWallet: Wallet,
  ) {
    this.cardBills = cbills;
    this.totalAmount = tAmount;
    this.enrichedAsset = asset;
    this.fromWallet = fWallet;
    this.toWallet = tWallet;
  }

  isValid(): boolean {
    return this.totalAmount === this.cardsTotalAmount();
  }

  cardsTotalQuantity(): number {
    return this.cardBills.reduce((total, c) => (total += c.quantity), 0);
  }

  cardsTotalAmount(): number {
    return this.cardBills.reduce(
      (total, c) => (total += c.quantity * Number(c.cardBillType)),
      0,
    );
  }
}

export class CardGenerationResult {
  cards: Card[] = [];
  cardGenTransactions: WalletTransaction[] = [];
  assetTransferTransaction: WalletTransaction;
  success: boolean;

  constructor(
    cards: Card[],
    cardsGenTx: WalletTransaction[],
    assetTransferTx: WalletTransaction,
    success: boolean,
  ) {
    this.assetTransferTransaction = assetTransferTx;
    this.cardGenTransactions = cardsGenTx;
    this.cards = cards;
    this.success = success;
  }
}
