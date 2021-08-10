import { Asset } from 'src/assets/asset.entity';

export class AssetMarketData {
  symbol: string;
  price: string;
}

export enum MarketTransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum MarketTransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum Markets {
  BINANCE = 'BINANCE',
}

export class ExchangeRate {
  constructor(
    fAsset: Asset,
    tAsset: Asset,
    r: string,
    marketName: string = Markets.BINANCE,
  ) {
    this.fromAsset = fAsset;
    this.rate = r;
    this.toAsset = tAsset;
    this.marketName = marketName;
  }
  fromAsset: Asset;
  toAsset: Asset;
  rate: string;
  marketName: string;
}

export class ConvertResult {
  constructor(
    fSymbol: Asset,
    tSymol: Asset,
    r: string,
    sizein: string,
    sizeout: string,
    marketName: string = Markets.BINANCE,
  ) {
    this.fromSymbol = fSymbol;
    this.sizeIn = sizein;
    this.sizeOut = sizeout;
    this.rate = r;
    this.toSymbol = tSymol;
    this.marketName = marketName;
  }
  fromSymbol: Asset;
  toSymbol: Asset;
  rate: string;
  sizeIn: string;
  sizeOut: string;
  marketName: string;
}

export class CryptoMarketTransactionResult {
  symbol: string;
  size: string;
  txAssetValueUsd: string;
  txSize: string;
  txPriceUsd: string;
  txType: MarketTransactionType;
  txFeeUsd: string;
  status: MarketTransactionStatus;

  constructor(
    symbol: string,
    size: string, // chadta mikhastam bekharam
    txSize: string, // Chandta kharidam
    txFeeUsd: string,
    txPriceUsd: string, // kolesh chand dollar shod
    txAssetValueUsd: string, // har done asset chand dollar bood on moghe
    txType: MarketTransactionType,
    status: MarketTransactionStatus,
  ) {
    this.size = size;
    this.status = status;
    this.symbol = symbol;
    this.txFeeUsd = txFeeUsd;
    this.txPriceUsd = txPriceUsd;
    this.txSize = txSize;
    this.txType = txType;
    this.txAssetValueUsd = txAssetValueUsd;
  }
}
