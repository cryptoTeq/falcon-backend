import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletAsset } from './entity/walletAsset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    @InjectRepository(WalletAsset)
    private walletAssetsRepository: Repository<WalletAsset>,
  ) {}

  assetsFor(walletId: number): Promise<WalletAsset[]> {
    const query = `
    SELECT a.name, a.symbol,
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

    return this.walletAssetsRepository.manager.connection.query(query, [
      walletId,
    ]);
  }
}
