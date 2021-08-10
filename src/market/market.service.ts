import { Injectable } from '@nestjs/common';
import { Asset, AssetTypes } from 'src/assets/asset.entity';
import { Utils } from 'src/utils';
import {
  AssetMarketData,
  CryptoMarketTransactionResult,
  ExchangeRate,
  MarketTransactionStatus,
  MarketTransactionType,
} from './dto';

@Injectable()
export class MarketService {
  async marketDataFor(symbol: string): Promise<AssetMarketData> {
    return (await this.marketData()).find(
      (a) => a.symbol.toUpperCase() === symbol.toUpperCase(),
    );
  }

  async marketData(): Promise<AssetMarketData[]> {
    //TODO: implement marketService
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { price: '1.00', symbol: 'CAD', priceUsd: '0.79' },
          { price: '1.85', symbol: 'TIK', priceUsd: '0.0' },
          { price: '32000.8558', symbol: 'BTC', priceUsd: '0.0' },
          { price: '1.85', symbol: 'ETH', priceUsd: '0.0' },
          { price: '0.25', symbol: 'DOGE', priceUsd: '0.0' },
          { price: '0.35', symbol: 'XRP', priceUsd: '0.0' },
        ]);
      }, 1200);
    });
  }

  async getExchangeRate(
    fromAsset: Asset,
    toAsset: Asset,
  ): Promise<ExchangeRate> {
    // return new ExchangeRate(fromSymbol, toSymbol, '0.79');
    return null;
  }

  // async buyAsset(
  //   assetType: AssetTypes,
  //   symbol: string,
  //   size: string,
  // ): Promise<CryptoMarketTransactionResult> {
  //   const markethandlers = {
  //     // [AssetTypes.CRYPTO]: this.buyCrypto,
  //     [AssetTypes.FIAT]: this.buyFiat,
  //   };
  //   return markethandlers[assetType](symbol, size);
  // }

  // async buyFiat(
  //   symbol: string,
  //   size: string,
  // ): Promise<CryptoMarketTransactionResult> {
  //   const marketTx = {
  //     txSize: size,
  //     txFeeUsd: '0.1',
  //     txPriceUsd: Utils.multiply(size, '0.78'),
  //     txAssetValueUsd: '0.78', // rate
  //     txType: MarketTransactionType.BUY,
  //     status: MarketTransactionStatus.SUCCESS,
  //   };
  //   const result = new CryptoMarketTransactionResult(
  //     symbol,
  //     size,
  //     marketTx.txSize,
  //     marketTx.txFeeUsd,
  //     marketTx.txPriceUsd,
  //     marketTx.txAssetValueUsd,
  //     marketTx.txType,
  //     marketTx.status,
  //   );
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(result);
  //     }, 50);
  //   });
  // }

  // async buyCrypto(
  //   symbol: string,
  //   amountUsd: string,
  // ): Promise<CryptoMarketTransactionResult> {
  //   //TODO: implement crypto market transaction
  //   const marketTx = {
  //     txSize: '5.678',
  //     txPriceUsd: '0.98',
  //     txType: MarketTransactionType.BUY,
  //     status: MarketTransactionStatus.SUCCESS,
  //   };
  //   const result = new CryptoMarketTransactionResult(
  //     symbol,
  //     amountUsd,
  //     marketTx.txSize,
  //     marketTx.txPriceUsd,
  //     marketTx.txType,
  //     marketTx.status,
  //   );
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(result);
  //     }, 900);
  //   });
  // }
}
