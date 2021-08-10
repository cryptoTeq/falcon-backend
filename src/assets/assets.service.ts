import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset, EnrichedAsset } from './asset.entity';
import { BASE_ENTITY_SATUSES } from '../database/baseEntity';
import { MyAssetDto } from '../my/myDto';
import { User } from '../users/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { getAssetAvatar } from '../assets/assets.utils';
import { Mapper } from '@automapper/types';
import { MarketService } from '../market/market.service';
import { Utils } from '../utils';

@Injectable()
export class AssetsService {
  constructor(
    @InjectMapper('classMapper') private mapper: Mapper,
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
    private readonly marketService: MarketService,
  ) {
    this.mapper.createMap(Asset, EnrichedAsset);
    this.mapper.createMap(MyAssetDto, MyAssetDto);
  }

  async findActives(): Promise<Asset[]> {
    return this.assetsRepository.find({
      order: { sortOrder: 'ASC' },
      where: { status: BASE_ENTITY_SATUSES.ACTIVE },
    });
  }

  async findById(id: number): Promise<Asset> {
    return this.assetsRepository.findOne(id);
  }

  findBySymbol(symbol: string): Promise<Asset> {
    return this.assetsRepository.findOne({
      where: { symbol: symbol.toUpperCase() },
    });
  }

  async enrichWithMarketData(asset: Asset): Promise<EnrichedAsset> {
    const result = this.mapper.map(asset, EnrichedAsset, Asset);
    const { price: marketPrice, priceUsd } =
      await this.marketService.marketDataFor(asset.symbol);
    result.assetValue = marketPrice; //TODO: Rename all value to price
    result.assetValueUsd = priceUsd;
    return result;
  }

  async enrichMyAssetsToDto(
    //TODO: Use the same service from AssetsService
    myAsset: MyAssetDto,
    user: User,
  ): Promise<MyAssetDto> {
    const result = this.mapper.map(myAsset, MyAssetDto, MyAssetDto);
    const { price: marketPrice } = await this.marketService
      .marketDataFor(myAsset.symbol)
      .catch(() => ({ price: '0' }));
    result.value = Utils.multiply(marketPrice, result.size);
    result.avatar = getAssetAvatar(result.symbol, user.getTheme());
    result.currencyCode = user.getCurrencyCode();
    result.currencySign = user.getCurrencySign();
    result.assetValue = marketPrice; //TODO: Rename all value to price
    return result;
  }
}
