import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Wallet, WalletType } from '../wallets/entity/wallet.entity';

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
          type: WalletType.SYSTEM,
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          ownerId: 1,
          sortOrder: 1,
          systemNote: 'Credit Card: 4*************71',
        },
        {
          status: 'ACTIVE',
          type: WalletType.SYSTEM,
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          ownerId: 2,
          sortOrder: 1,
          systemNote: 'Asset Holder',
        },
        {
          status: 'ACTIVE',
          type: WalletType.SYSTEM,
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          ownerId: 3,
          sortOrder: 1,
          systemNote: 'Asset Holder',
        },

        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff2',
          ownerId: 4,
          type: WalletType.SYSTEM,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff3',
          ownerId: 5,
          type: WalletType.USER,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          type: WalletType.USER,
          ownerId: 6,
          sortOrder: 1,
        },
        {
          status: 'ACTIVE',
          address: '0xebc8d9cf3a7516bc713066f8d6db3523c3a73ff1',
          type: WalletType.USER,
          ownerId: 7,
          sortOrder: 1,
        },
      ])
      .execute();
  }
}
