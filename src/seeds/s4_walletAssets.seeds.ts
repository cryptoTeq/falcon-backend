import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { WalletAsset } from '../wallets/entity/walletAsset.entity';
import { SYSTEM_WALLETS } from 'src/wallets/entity/wallet.entity';

export default class CreateWalletAssets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletAsset)
      .createQueryBuilder()
      .insert()
      .into(WalletAsset)
      .values([
        {
          status: 'ACTIVE',
          assetId: 1,
          averageInValueUsd: '0.79',
          size: '15.00',
          walletId: SYSTEM_WALLETS.BANK_ACCOUNT_WALLET_ID,
        },
      ])
      .execute();
  }
}
