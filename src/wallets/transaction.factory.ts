import { Card } from '../cards/card.entity';
import { CardGenerationReq } from '../cards/dto/card.dto';
import { TransferReq } from './dto';
import {
  TransactionStatus,
  TransactionType,
  WalletTransaction,
} from './entity/walletTransaction.entity';

export enum FactoryType {
  CARD_GENERATION = 'CARD_GENERATION',
  ASSET_TRANSFER = 'ASSET_TRANSFER',
}

export class TransactionFactory {
  static createTransaction(
    type: FactoryType,
    params: object,
  ): WalletTransaction {
    const creators = {
      [FactoryType.CARD_GENERATION]: fromCardGeneration,
      [FactoryType.ASSET_TRANSFER]: fromAssetTransfer,
    };
    return creators[type](params);
  }
}

export class TxFromCardGenReq {
  generatedCard: Card;
  cardGenReq: CardGenerationReq;
}

const fromAssetTransfer = (params: object | TransferReq) => {
  const transferReq = params as TransferReq;
  const { enrichedAsset, fromWallet, size, toWallet, totalValueUsd } =
    transferReq;
  const result = new WalletTransaction();

  result.fromAssetId = enrichedAsset.id;
  result.fromAssetValueUsd = enrichedAsset.assetValueUsd; // TODO: from enrichedAsset
  result.fromSymbol = enrichedAsset.symbol;
  result.toAssetId = enrichedAsset.id;
  result.toAssetValueUsd = enrichedAsset.assetValueUsd;
  result.toSymbol = enrichedAsset.symbol;

  result.totalValueUsd = totalValueUsd();

  result.from = fromWallet.name; // TODO: from and to are hardcoded, what if user/system changes wallet name
  result.fromWalletId = fromWallet.id;
  result.to = toWallet.getName();
  result.toWalletId = toWallet.id;
  result.internal = true;
  result.prevTxId = 0;
  result.size = size;
  result.type = TransactionType.CONVERT_ASSET;
  result.txFee = '0'; //TODO: should get from TXFeeCalculator service
  result.txFeeUsd = '0';
  result.status = TransactionStatus.COMPLETED;

  return result;
};

const fromCardGeneration = (
  params: object | TxFromCardGenReq,
): WalletTransaction => {
  const req = params as TxFromCardGenReq;
  const result = new WalletTransaction();

  const { cardGenReq, generatedCard } = req;

  result.fromAssetId = cardGenReq.enrichedAsset.id;
  result.fromAssetValueUsd = cardGenReq.enrichedAsset.assetValueUsd; // TODO: from enrichedAsset
  result.fromSymbol = cardGenReq.enrichedAsset.symbol;
  result.toAssetId = cardGenReq.enrichedAsset.id;
  result.toAssetValueUsd = cardGenReq.enrichedAsset.assetValueUsd;
  result.toSymbol = cardGenReq.enrichedAsset.symbol;

  result.totalValueUsd = '';

  result.from = cardGenReq.fromWallet.name;
  result.fromWalletId = cardGenReq.fromWallet.id;
  result.to = cardGenReq.toWallet.name;
  result.toWalletId = cardGenReq.toWallet.id;
  result.internal = true;
  result.prevTxId = 0;
  result.size = generatedCard.size;
  result.type = TransactionType.CARD_GENERATION;
  result.txFee = '0'; //TODO: should get from TXFeeCalculator service
  result.txFeeUsd = '0';
  result.status = TransactionStatus.PENDING;

  return result;
};
