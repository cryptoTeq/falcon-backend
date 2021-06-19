import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { WalletAsset } from '../wallets/entity/walletAsset.entity';

export default class CreateWalletAssets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletAsset)
      .createQueryBuilder()
      .insert()
      .into(WalletAsset)
      .values([
        {
          assetId: 1,
          size: '115349.0001458',
          walletId: 1,
          status: 'ACTIVE',
        },
        {
          assetId: 2,
          size: '18.34',
          walletId: 1,
          status: 'ACTIVE',
        },
        {
          assetId: 1,
          size: '3238.3564',
          walletId: 2,
          status: 'ACTIVE',
        },
        {
          assetId: 3,
          size: '13.34',
          walletId: 2,
          status: 'ACTIVE',
        },
        {
          assetId: 5,
          size: '19.0024',
          walletId: 3,
          status: 'ACTIVE',
        },
      ])
      .execute();
  }
}
