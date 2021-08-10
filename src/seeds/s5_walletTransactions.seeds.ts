import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {
  TransactionStatus,
  TransactionType,
  WalletTransaction,
} from '../wallets/entity/walletTransaction.entity';

export default class CreateWalletTransactions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletTransaction)
      .createQueryBuilder()
      .insert()
      .into(WalletTransaction)
      .values([])
      .execute();
  }
}
