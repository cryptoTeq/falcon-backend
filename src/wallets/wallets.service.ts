import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BASE_ENTITY_SATUSES } from '../database/baseEntity';
import { Repository, getManager } from 'typeorm';
import { SYSTEM_WALLETS, Wallet } from './entity/wallet.entity';
import { WalletAsset } from './entity/walletAsset.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { MyAssetDto } from '../my/myDto';
import { Utils } from '../utils';
import { TransferReq, TransferResult } from './dto';
import { Asset, EnrichedAsset } from '../assets/asset.entity';
import { TransactionsService } from './transactions.service';
import { FactoryType } from './transaction.factory';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
    @InjectRepository(WalletAsset)
    private readonly walletAssetsRepository: Repository<WalletAsset>,
    private readonly transactionsService: TransactionsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {}

  async getAssetHolderWallet(): Promise<Wallet> {
    return this.getById(SYSTEM_WALLETS.ASSET_HOLDER_WALLET.id);
  }

  async getById(id: number): Promise<Wallet> {
    return this.walletsRepository.findOne(id);
  }

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

  async transfer(req: TransferReq): Promise<TransferResult> {
    const { enrichedAsset, fromWallet, size, saveTransaction, toWallet } = req;
    const wAssetFrom = await this.getWalletAsset(
      fromWallet.id,
      enrichedAsset.id,
    );
    if (Utils.isLessThan(wAssetFrom.size, size))
      return new TransferResult(false, 'No sufficient fund');

    let wAssetTo = await this.getWalletAsset(toWallet.id, enrichedAsset.id);
    if (!wAssetTo) {
      wAssetTo = new WalletAsset();
      wAssetTo.assetId = enrichedAsset.id;
      wAssetTo.size = '0.0';
      wAssetTo.averageInValueUsd = '0.0';
      wAssetTo.walletId = toWallet.id;
    }
    // Deduct Asset
    wAssetFrom.size = Utils.minus(wAssetFrom.size, size);
    this.walletAssetsRepository.save(wAssetFrom);

    // Add Asset
    wAssetTo.size = Utils.add(wAssetTo.size, size);
    wAssetTo.averageInValueUsd = Utils.average(
      wAssetTo.averageInValueUsd,
      enrichedAsset.assetValueUsd,
    );

    this.walletAssetsRepository.save(wAssetTo);

    // Transaction
    const tx = this.transactionsService.createTransaction(
      FactoryType.ASSET_TRANSFER,
      req,
    );

    const result = new TransferResult(true);
    result.transactionSaved = saveTransaction;
    result.enrichedAsset = enrichedAsset;
    result.transaction = tx;
    result.transactionSaved = req.saveTransaction;
    if (req.saveTransaction) {
      await this.transactionsService.bulkSave([tx]);
    }

    return result;
  }
}
