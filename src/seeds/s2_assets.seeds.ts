import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Asset, AssetTypes } from '../assets/asset.entity';

export default class CreateAssets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Asset)
      .createQueryBuilder()
      .insert()
      .into(Asset)
      .values([
        {
          status: 'ACTIVE',
          type: AssetTypes.FIAT,
          symbol: 'CAD',
          name: 'Canadian Dollar',
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          symbol: 'TIK',
          name: 'Tikcoin',
          type: AssetTypes.CRYPTO,
          sortOrder: 2,
        },
        {
          status: 'ACTIVE',
          symbol: 'BTC',
          type: AssetTypes.CRYPTO,
          name: 'Bitcoin',
          sortOrder: 3,
        },
        {
          status: 'ACTIVE',
          symbol: 'ETH',
          name: 'Ethereum',
          type: AssetTypes.CRYPTO,
          sortOrder: 4,
        },
        {
          status: 'ACTIVE',
          symbol: 'DOGE',
          type: AssetTypes.CRYPTO,
          name: 'Dogecoin',
          sortOrder: 5,
        },
        {
          status: 'ACTIVE',
          type: AssetTypes.CRYPTO,
          symbol: 'XRP',
          name: 'XRP',
          sortOrder: 6,
        },
      ])
      .execute();
  }
}
