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
          status: 'ACTIVE',
          assetId: 1,
          averageInValueUsd: '0.79',
          size: '2000',
          walletId: 1,
        },
        {
          status: 'ACTIVE',
          assetId: 3,
          averageInValueUsd: '200.00',
          size: '100236',
          walletId: 5,
        },
        {
          status: 'ACTIVE',
          assetId: 3,
          averageInValueUsd: '200.00',
          size: '1034536',
          walletId: 6,
        },
        {
          status: 'ACTIVE',
          assetId: 5,
          averageInValueUsd: '890.24',
          size: '735348',
          walletId: 7,
        },
        {
          status: 'ACTIVE',
          assetId: 4,
          averageInValueUsd: '13000.24',
          size: '737348',
          walletId: 5,
        },
      ])
      .execute();
  }
}
