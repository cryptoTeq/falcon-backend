import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BASE_ENTITY_SATUSES } from '../database/baseEntity';
import { Repository, getManager } from 'typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletAsset } from './entity/walletAsset.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { MyAssetDto } from '../my/myDto';
import { Utils } from 'src/utils';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    @InjectRepository(WalletAsset)
    private walletAssetsRepository: Repository<WalletAsset>,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {}

  async assetsFor(walletId: number): Promise<MyAssetDto[]> {
    const query = `
    SELECT a.name, a.symbol, a.type, a.id  asset_id,
    CASE WHEN wa.size is NULL THEN '0.0' ELSE wa.size END,
    CASE WHEN wa.wallet_id is NULL then 0 ELSE wa.wallet_id END
    FROM (SELECT wa.wallet_id, wa.asset_id, wa.size, wa.average_in_value_usd, w.status as wallet_status 
         FROM wallet_assets wa
         JOIN wallets W on wa.wallet_id=w.id
         WHERE wa.wallet_id = (SELECT default_wallet_id FROM users WHERE id=$1 )) wa
    RIGHT JOIN assets a on wa.asset_id=a.id
    WHERE
    a.status = 'ACTIVE'
    AND (wa.wallet_status='ACTIVE' OR wa.wallet_status IS NULL);`;

    const manager = getManager();
    const queryResult = await manager.query(query, [walletId]);
    const result: MyAssetDto[] = [];
    queryResult.map((a) => {
      const wa = new MyAssetDto();
      wa.name = a.name;
      wa.symbol = a.symbol;
      wa.size = a.size;
      wa.type = a.type;
      result.push(wa);
    });
    return result;
  }

  async getWalletAsset(
    walletId: number,
    assetId: number,
  ): Promise<WalletAsset> {
    return this.walletAssetsRepository.findOne({
      where: { walletId, assetId, status: BASE_ENTITY_SATUSES.ACTIVE },
    });
  }

  async transfer(
    fromWalletId: number,
    toWalletId: number,
    assetId: number,
    size: string,
    totalValueUsd: string,
  ): Promise<WalletAsset> {
    const wAssetfrom = await this.getWalletAsset(fromWalletId, assetId);
    if (Utils.isLessThan(wAssetfrom.size, size)) return;

    let wAssetTo = await this.getWalletAsset(toWalletId, assetId);
    if (!wAssetTo) {
      wAssetTo = new WalletAsset();
      wAssetTo.assetId = assetId;
      wAssetTo.size = '0.0';
      wAssetTo.averageInValueUsd = '0.0';
      wAssetTo.walletId = toWalletId;
    }
    // Deduct Asset
    wAssetfrom.size = Utils.minus(wAssetfrom.size, size);
    this.walletAssetsRepository.save(wAssetfrom);

    // Add Asset
    wAssetTo.size = Utils.add(wAssetTo.size, size);
    wAssetTo.averageInValueUsd = Utils.average(
      wAssetTo.averageInValueUsd,
      totalValueUsd,
    );
    this.walletAssetsRepository.save(wAssetTo);

    return wAssetTo;
  }
}
