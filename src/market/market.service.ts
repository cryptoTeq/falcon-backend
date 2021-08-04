import { Injectable } from '@nestjs/common';
import { AssetMarketData } from './dto';

@Injectable()
export class MarketService {
  async marketDataFor(symbol: string): Promise<AssetMarketData> {
    return (await this.marketData()).find(
      (a) => a.symbol.toUpperCase() === symbol.toUpperCase(),
    );
  }

  async marketData(): Promise<AssetMarketData[]> {
    //TODO: implement marketService
    return [
      { price: '1.00', symbol: 'CAD' },
      { price: '1.85', symbol: 'TIK' },
      { price: '32000.8558', symbol: 'BTC' },
      { price: '1.85', symbol: 'ETH' },
      { price: '0.25', symbol: 'DOGE' },
      { price: '0.35', symbol: 'XRP' },
    ];
  }
}
