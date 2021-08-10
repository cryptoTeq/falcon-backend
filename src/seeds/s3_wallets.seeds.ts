import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SYSTEM_WALLETS, Wallet } from '../wallets/entity/wallet.entity';

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
          name: SYSTEM_WALLETS.CIBC_CREDIT_CARD_WALLET.name,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff2',
          ownerId: 2,
          name: SYSTEM_WALLETS.ASSET_CONVERTER_WALLET.name,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff3',
          ownerId: 3,
          name: SYSTEM_WALLETS.ASSET_HOLDER_WALLET.name,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          ownerId: 4,
          name: SYSTEM_WALLETS.SYSTEM_AGENT.name,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff2',
          ownerId: 5,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff3',
          ownerId: 6,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff3',
          ownerId: 7,
          sortOrder: 1,
        },
      ])
      .execute();
  }
}
