import { Injectable } from '@nestjs/common';
import { Asset, AssetTypes } from 'src/assets/asset.entity';
import { ConvertResult, ExchangeRate } from './dto';

@Injectable()
export class ConvertService {
  // async convert(
  //     fromAsset: Asset,
  //     toAsset: Asset,
  //     size: string,
  //   ): Promise<ConvertResult> {
  //     // if (
  //     //   fromAsset.type === AssetTypes.REAL_ESTATE &&
  //     //   toAsset.symbol.toUpperCase() !== 'CAD'
  //     // ) {
  //     // TODO: User can only convert REAL_ESTATE to CAD
  //     // }

  //     const assetConverters = {
  //       [AssetTypes.CRYPTO]: this.convertCrypto
  //     }

  //     return assetConverters[from];
  //   }

  isConvertableTo(fromAsset: Asset, toAsset: Asset): Boolean {
    return fromAsset.convertableTo().includes(toAsset.symbol);
  }

  async convertCrypto(
    fromAsset: Asset,
    toAsset: Asset,
    size: string,
  ): Promise<ConvertResult> {
    // return new ConvertResult(fromAsset);
    return null;
  }
}
