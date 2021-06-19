import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Asset } from '../assets/asset.entity';

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
          symbol: 'TIK',
          name: 'Tikcoin',
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          symbol: 'BTC',
          name: 'Bitcoin',
          sortOrder: 2,
        },
        {
          status: 'ACTIVE',
          symbol: 'ETH',
          name: 'Ethereum',
          sortOrder: 3,
        },
        {
          status: 'ACTIVE',
          symbol: 'DOGE',
          name: 'Dogecoin',
          sortOrder: 4,
        },
        {
          status: 'ACTIVE',
          symbol: 'XRP',
          name: 'XRP',
          sortOrder: 5,
        },
      ])
      .execute();
  }
}
