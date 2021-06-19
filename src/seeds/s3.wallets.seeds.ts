import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Wallet } from '../wallets/entity/wallet.entity';

export default class CreateWallets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Wallet)
      .createQueryBuilder()
      .insert()
      .into(Wallet)
      .values([
        {
          address:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f61',
          ownerId: 1,
          status: 'ACTIVE',
        },
        {
          address:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f62',
          ownerId: 2,
          status: 'ACTIVE',
        },
        {
          address:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f63',
          ownerId: 3,
          status: 'ACTIVE',
        },
      ])
      .execute();
  }
}
