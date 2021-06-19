import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { WalletAsset } from 'src/wallets/entity/walletAsset.entity';

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
          averageInValueUsd: '0.00011',
          size: '90000',
          walletId: 1,
        },
        {
          status: 'ACTIVE',
          assetId: 2,
          averageInValueUsd: '200.00',
          size: '100236',
          walletId: 1,
        },
        {
          status: 'ACTIVE',
          assetId: 2,
          averageInValueUsd: '200.00',
          size: '1034536',
          walletId: 2,
        },
        {
          status: 'ACTIVE',
          assetId: 4,
          averageInValueUsd: '890.24',
          size: '735348',
          walletId: 2,
        },
        {
          status: 'ACTIVE',
          assetId: 3,
          averageInValueUsd: '13000.24',
          size: '737348',
          walletId: 3,
        },
      ])
      .execute();
  }
}
