import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Wallet } from 'src/wallets/entity/wallet.entity';

export default class CreateWallets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Wallet)
      .createQueryBuilder()
      .insert()
      .into(Wallet)
      .values([
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          ownerId: 1,
          sort_order: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff2',
          ownerId: 2,
          sort_order: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff3',
          ownerId: 3,
          sort_order: 1,
        },
      ])
      .execute();
  }
}
