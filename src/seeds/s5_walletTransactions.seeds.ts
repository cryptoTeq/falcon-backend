import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { WalletTransaction } from 'src/wallets/entity/walletTransaction.entity';

export default class CreateWalletAssets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletTransaction)
      .createQueryBuilder()
      .insert()
      .into(WalletTransaction)
      .values([{}])
      .execute();
  }
}
